import React from 'react';
import { uid } from "react-uid";
import './PostFeed.css';
import Amplify from 'aws-amplify';

import Post from '../Post/Post'
import Loader from '../Loader/Loader'

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
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPosts',
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});
		
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
