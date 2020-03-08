import React from 'react';
import { uid } from "react-uid";
import './TopTags.css';
import Amplify from 'aws-amplify';

import SearchBar from '../SearchBar/SearchBar'

class TopTags extends React.Component {
	state = {
		hashtags: []
	}

	componentDidMount() {
		Amplify.configure({
			API: {
				endpoints: [{
					name: 'getPopularHashtags',
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPopularHashtags',
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});

		Amplify.API.get('getPopularHashtags', '', {}).then((response) => {
			const tags = [];

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}

			response.forEach((tag) => {
				tags.push('#' + tag.hashtag);
			});

			this.setState({ hashtags: tags });
		}).catch((error) => {
			console.log(error);
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
					<div key={ uid(hashtag) } onClick={ () => { this.props.store.search(hashtag) } } className="Hashtag accent">
						{ hashtag }
					</div>
				))
			}
		</div>
	)}
};

export default TopTags;
