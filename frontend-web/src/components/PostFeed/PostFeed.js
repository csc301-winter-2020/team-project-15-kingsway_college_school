import React from 'react';
import { uid } from "react-uid";
import './PostFeed.css';

import Post from '../Post/Post'

class PostFeed extends React.Component {
	state = {
		posts: [
			{
				id: 1,
				location: 'Toronto, ON',
				content: 'Aenean imperdiet. Quisque rutrum. In hac habitasse platea dictumst. Quisque ut nisi. Etiam imperdiet imperdiet orci. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Curabitur a felis in nunc fringilla tristique. Maecenas malesuada. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
				uploadTime: 1582653096
			},
			{
				id: 2,
				location: 'Toronto, ON',
				content: 'Aenean imperdiet. Quisque rutrum. In hac habitasse platea dictumst. Quisque ut nisi. Etiam imperdiet imperdiet orci. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Curabitur a felis in nunc fringilla tristique. Maecenas malesuada. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
				uploadTime: 1582653096
			},
			{
				id: 3,
				location: 'Toronto, ON',
				content: 'Aenean imperdiet. Quisque rutrum. In hac habitasse platea dictumst. Quisque ut nisi. Etiam imperdiet imperdiet orci. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Curabitur a felis in nunc fringilla tristique. Maecenas malesuada. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
				uploadTime: 1582653096
			},
			{
				id: 4,
				location: 'Toronto, ON',
				content: 'Aenean imperdiet. Quisque rutrum. In hac habitasse platea dictumst. Quisque ut nisi. Etiam imperdiet imperdiet orci. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Curabitur a felis in nunc fringilla tristique. Maecenas malesuada. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
				uploadTime: 1582653096
			}
		]
	}

	render() {
		return (
		<div className="PostFeed dark-grey light-grey-text">
			{
				this.state.posts.map((post) => (
						<Post key={ uid(post.id) } post={post} />
				))
			}
		</div>
	)}
};

export default PostFeed;
