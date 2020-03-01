import React from 'react';
import { uid } from "react-uid";
import './PostFeed.css';
import Amplify from 'aws-amplify';

import Post from '../Post/Post'

class PostFeed extends React.Component {
	state = {
		posts: []
	}

	constructor() {
		super();

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
	}

	getPosts = () => {
		Amplify.API.get('getPosts', '', { headers: {} }).then((response) => {
			const posts = [];

			console.log(response);

			response.forEach((post) => {
				posts.push({
					id: post.postID,
					location: post.location,
					content: post.content,
					uploadTime: post.timeUploaded
				});
			});

			this.setState({ posts: posts });
		}).catch((error) => {
			console.log(error);
		});
	}

	componentWillMount() {
		const feedType = this.props.feedType;

		this.getPosts(feedType);
	}

	render() {
		return (
		<div className="PostFeed light-grey-text">
			{
				this.state.posts.map((post) => (
						<Post key={ uid(post.id) } post={post} />
				))
			}
		</div>
	)}
};

export default PostFeed;
