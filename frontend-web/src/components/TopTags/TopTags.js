import React from 'react';
import { uid } from "react-uid";
import './TopTags.css';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';

import SearchBar from '../SearchBar/SearchBar'

class TopTags extends React.Component {
	state = {
		hashtags: []
	}

	async componentDidMount() {
		let session;
		let user = await Auth.currentAuthenticatedUser();
		await user.getSession(function(err, sesh) {
			session = sesh;
			console.log(session)
		})
		Amplify.configure({
			API: {
				endpoints: [{
					name: 'getPopularHashtags',
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPopularHashtags',
					service: 'api-gateway',
					region: 'us-east-1',
				}]
			},
			Auth: {

				// REQUIRED - Amazon Cognito Region
				region: 'us-east-1',
		
				// OPTIONAL - Amazon Cognito User Pool ID
				userPoolId: 'us-east-1_jXw5z0sO3',
		
				// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
				userPoolWebClientId: '2be70uebsba896oah66e7gduua',
		
				// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
				mandatorySignIn: true,
		
				// OPTIONAL - Configuration for cookie storage
				// Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
				// cookieStorage: {
				// // REQUIRED - Cookie domain (only required if cookieStorage is provided)
				//     domain: 'kcsshare.auth.us-east-1.amazoncognito.com',
				// // OPTIONAL - Cookie path
				//     path: '/',
				// // OPTIONAL - Cookie expiration in days
				//     expires: 365,
				// // OPTIONAL - Cookie secure flag
				// // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
				//     secure: true
				// },
		
				// OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
				authenticationFlowType: 'USER_PASSWORD_AUTH',
		
				// OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
				// clientMetadata: { myCustomKey: 'myCustomValue' },
		
				// OPTIONAL - Hosted UI configuration
				// oauth: {
				//     domain: 'your_cognito_domain',
				//     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
				//     redirectSignIn: 'http://localhost:3000/',
				//     redirectSignOut: 'http://localhost:3000/',
				//     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
				// }
			}
		});

		Amplify.API.get('getPopularHashtags', '', {headers : {Authorization : session.idToken.jwtToken}}).then((response) => {
			const tags = [];

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}

			response.forEach((tag) => {
				tags.push('#' + tag.hashtag);
			});

			this.setState({ hashtags: tags });
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		return (
		<div className="TopTags dark-grey light-grey-text">
			<SearchBar store={ this.props.store } />

			<h1>
				TopTags
			</h1>

			{
				this.state.hashtags.map((hashtag) => (
					<div key={ uid(hashtag) } onClick={ () => { this.props.store.search(hashtag); } } className="Hashtag accent">
						{ hashtag }
					</div>
				))
			}
		</div>
	)}
};

export default TopTags;
