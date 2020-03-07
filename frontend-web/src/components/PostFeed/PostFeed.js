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

	componentWillMount() {
		this.setState({ hasPosts: false });

		const feedType = this.props.feedType;

		this.getPosts(feedType);
	}

	render() {
		return (
		<div className="PostFeed light-grey-text">
			{ this.state.hasPosts ? '' : <Loader /> }
			{
				this.state.posts.map((post) => (
						<Post key={ uid(post.postID) } post={post} />
				))
			}
		</div>
	)}
};

export default PostFeed;
