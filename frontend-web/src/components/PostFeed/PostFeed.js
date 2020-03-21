import React from 'react';
import { uid } from "react-uid";
import './PostFeed.css';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import Post from '../Post/Post'
import Loader from '../Loader/Loader'
let username = "devin"
let password = "bing0Bang@@"
let email = "asdf@gmail.com"
class PostFeed extends React.Component {
	state = {
		hasPosts: false,
		posts: []
	}

	getPosts = (feedType, searchTerm) => {
		Amplify.configure({
			API: {
				endpoints: [{
					name: 'getPosts',
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPosts',
					service: 'api-gateway',
					region: 'us-east-1'
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
		this.SignIn()
		let getParams = {};

		const userID = '2';

		if (feedType === 'Home') {
			if (searchTerm) {
				getParams = { queryStringParameters: { searchType: 'TAG', searchParameter: searchTerm } };
			}
		} else if (feedType === 'My Posts') {
			getParams = { queryStringParameters: { searchType: 'USER', searchParameter: userID } };
		} else if (feedType === 'Favourites') {
			getParams = { queryStringParameters: { searchType: 'FAV', searchParameter: userID } };
		}

		Amplify.API.get('getPosts', '', getParams).then((response) => {
			const posts = [];

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}

			response.forEach((post) => {
				posts.push({
					postID: post.postID,
					userID: post.userID,
					location: post.location,
					content: post.content,
					images: post.images,
					uploadTime: post.timeUploaded,
				});
			});

			this.setState({ posts: posts, hasPosts: true });
		}).catch((error) => {
			console.log(error);
		});
	}

	SignIn = async () => {
		try {
			const user = await Auth.signIn(username, password);
			if (user.challengeName === 'SMS_MFA' ||
				user.challengeName === 'SOFTWARE_TOKEN_MFA') {
				// You need to get the code from the UI inputs
				// and then trigger the following function with a button click
				// const code = getCodeFromUserInput();
				// If MFA is enabled, sign-in should be confirmed with the confirmation code
				// const loggedUser = await Auth.confirmSignIn( 
				// 	user,   // Return object from Auth.signIn()
				// 	code,   // Confirmation code  
				// 	mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
				// );
			} else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
				// You need to get the new password and required attributes from the UI inputs
				// and then trigger the following function with a button click
				// For example, the email and phone_number are required attributes
				// const {username, email, phone_number} = getInfoFromUserInput();
				const loggedUser = await Auth.completeNewPassword(
					user,              // the Cognito User Object
					password,       // the new password
					// OPTIONAL, the required attributes
					// {
					// 	email : email,
					// }
					//     phone_number,
					// } 
				);
			} else if (user.challengeName === 'MFA_SETUP') {
				// This happens when the MFA method is TOTP
				// The user needs to setup the TOTP before using it
				// More info please check the Enabling MFA part
				Auth.setupTOTP(user);
			} else {
				// The user directly signs in
				// console.log(user);
			}
		} catch (err) { 
			console.log(err);
			if (err.code === 'UserNotConfirmedException') {
				// The error happens if the user didn't finish the confirmation step when signing up
				// In this case you need to resend the code and confirm the user
				// About how to resend the code and confirm the user, please check the signUp part
			} else if (err.code === 'PasswordResetRequiredException') {
				// The error happens when the password is reset in the Cognito console
				// In this case you need to call forgotPassword to reset the password
				// Please check the Forgot Password part.
			} else if (err.code === 'NotAuthorizedException') {
				// The error happens when the incorrect password is provided
			} else if (err.code === 'UserNotFoundException') {
				// The error happens when the supplied username/email does not exist in the Cognito user pool
			} else {
				console.log(err);
			}
		}
	}
	search = (searchTerm) => {
		this.setState({ hasPosts: false, posts: [] });

		const feedType = this.props.store.currentView;

		this.getPosts(feedType, searchTerm);
	}

	componentDidMount() {
		this.setState({ hasPosts: false });

		const feedType = this.props.store.currentView;

		this.getPosts(feedType);

		this.props.store.search = this.search;

		this.props.store.updateFeedCallback = [() => { this.getPosts(this.props.store.currentView) }];
	}

	render() {
		return (
		<div className="PostFeed light-grey-text">
			{ this.state.hasPosts ? '' : <Loader /> }
			{
				this.state.posts.map((post) => (
					<Post store={ this.props.store } key={ uid(post.postID) } post={ post } />
				))
			}
		</div>
	)}
};

export default PostFeed;
