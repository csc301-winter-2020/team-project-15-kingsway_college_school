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
				location: 'Ottawa, ON',
				content: 'Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Praesent venenatis metus at tortor pulvinar varius. Fusce fermentum odio nec arcu. Vivamus elementum semper nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
				uploadTime: 1582653096
			},
			{
				id: 3,
				location: 'Montreal, QC',
				content: 'Maecenas malesuada. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Phasellus viverra nulla ut metus varius laoreet.',
				uploadTime: 1582653096
			},
			{
				id: 4,
				location: 'Toronto, ON',
				content: 'Aenean imperdiet. Quisque rutrum. In hac habitasse platea dictumst. Quisque ut nisi. Etiam imperdiet imperdiet orci. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Curabitur a felis in nunc fringilla tristique. Maecenas malesuada. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
				uploadTime: 1582653096
			},
			{
				id: 5,
				location: 'Ottawa, ON',
				content: 'Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Praesent venenatis metus at tortor pulvinar varius. Fusce fermentum odio nec arcu. Vivamus elementum semper nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
				uploadTime: 1582653096
			},
			{
				id: 6,
				location: 'Montreal, QC',
				content: 'Maecenas malesuada. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Phasellus viverra nulla ut metus varius laoreet.',
				uploadTime: 1582653096
			},
		]
	}

	render() {
		return (
		<div className={ 'PostFeed light-grey-text ' + (this.props.wide ? 'thin' : '') }>
			{
				this.state.posts.map((post) => (
						<Post key={ uid(post.id) } post={post} />
				))
			}
		</div>
	)}
};

export default PostFeed;
