import React from 'react';
import './Post.css';

class Post extends React.Component {
	state = {}

	render() {
		const { post } = this.props;

		let time = new Date(0);
		time.setUTCSeconds(post.uploadTime);

		const month = {
			0: 'January',
			1: 'February',
			2: 'March',
			3: 'April',
			4: 'May',
			5: 'June',
			6: 'July',
			7: 'August',
			8: 'September',
			9: 'October',
			10: 'November',
			11: 'December'
		}

		return (
		<div className="Post shadow mid-grey light-grey-text">
			<div className="PostLocation">
				<a className="accent fa fa-map-marker"></a>
				&nbsp;&nbsp;
				{ post.location }
			</div>

			<div className="PostContent">
				{ post.content }
			</div>

			<div className="PostUploadTime">
				{ '' + month[time.getMonth()] + ' ' + time.getDay() + ', ' + time.getFullYear() }
			</div>
		</div>
	)}
};

export default Post;
