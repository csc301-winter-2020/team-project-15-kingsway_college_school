import React from 'react';
import './Post.css';
import Amplify from 'aws-amplify';

import Modal from '../Modal/Modal'

class Post extends React.Component {
	state = {
		modalVisible: false
	}

	confirmDeletion = (e) => {
		e.preventDefault();

		this.setState({ modalVisible: true });
	}

	deletePost = () => {
		Amplify.configure({
			API: {
				endpoints: [{
					name: 'deletePost',
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/deletePost',
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});

		const reqParams = { queryStringParameters: { userID: 2, postID: this.props.post.postID } };

		Amplify.API.del('deletePost', '', reqParams).then((response) => {
			this.props.store.updateFeeds();
		}).catch((error) => {
			console.log(error);
		});

		this.setState({ modalVisible: false })
	}

	render() {
		const { post } = this.props;

		if(post === undefined){
			return(
			<div className="Post shadow mid-grey light-grey-text">Click a post on the map to see it! </div>
			)
		}

		let time = new Date(post.uploadTime * 1000);

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
			{
				post.location.name ? <div className="PostLocation">
					<a className="accent fa fa-map-marker"></a>
					&nbsp;&nbsp;
					{ post.location.name }
				</div> : ''
			}

			<div className="PostContent">
				{ post.content }
			</div>
			{post.images.length > 0 && <div className="PostImage">
				<img src={ post.images[0] }/>
			</div>} 

			<div className="PostUploadTime">
				{ '' + month[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear() }
			</div>

			{ this.props.store.currentView === 'My Posts' ? <div className="delete-button fa fa-trash" onClick={ this.confirmDeletion }></div> : '' }

			<Modal parent={ this } visible={ this.state.modalVisible } prompt="Are you sure you sure you want to delete this post?"
				positiveButtonAction={ this.deletePost } negativeButtonAction={ () => { this.setState({ modalVisible: false }) } } 
				positiveButtonText="Delete" negativeButtonText="Cancel"/>
		</div>
	)}
};

export default Post;
