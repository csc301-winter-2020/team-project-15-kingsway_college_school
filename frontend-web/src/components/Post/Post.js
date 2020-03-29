import React from 'react';
import './Post.css';
import Amplify from 'aws-amplify';

import Modal from '../Modal/Modal'

class Post extends React.Component {
	state = {
		modalVisible: false,
		copySuccess: false
	}

	confirmDeletion = (e) => {
		e.preventDefault();

		this.setState({ modalVisible: true });
	}

	deletePost = () => {
		this.props.enableLoader()

		const reqParams = { queryStringParameters: {postID: this.props.post.postID } };

		reqParams["headers"] = {"Authorization" : this.props.store.session.idToken.jwtToken}

		Amplify.API.del('deletePost', '', reqParams).then((response) => {
			this.props.store.updateFeeds();
		}).catch((error) => {
			console.error(error);
		});

		this.setState({ modalVisible: false })
	}

	copyToClipboard = () => {
		this.textArea.select();
		document.execCommand('copy');
		// This is just personal preference.
		// I prefer to not show the the whole text area selected.
		//e.target.focus();
		this.setState({ copySuccess: true });
	  };

	favouritePost = () => {
		if (this.props.post.favourited) {
			this.props.post.favourited = false
			this.setState({ copySuccess: false });
			this.forceUpdate()

			const reqParams = { queryStringParameters: {postID: this.props.post.postID } };

			reqParams["headers"] = {"Authorization" : this.props.store.session.idToken.jwtToken}

			Amplify.API.put('unfavouritePost', '', reqParams).then((response) => {
				
			}).catch((error) => {
				console.error(error);
				this.props.post.favourited = true
				this.forceUpdate()
			});
		} else {
			this.props.post.favourited = true
			this.forceUpdate()

			//console.log("permalink required " + this.props.post.postID)
			//console.log(window.location.href + "permalink?post=" + this.props.post.postID)
			this.copyToClipboard()

			const reqParams = { queryStringParameters: {postID: this.props.post.postID } };

			reqParams["headers"] = {"Authorization" : this.props.store.session.idToken.jwtToken}

			Amplify.API.put('favouritePost', '', reqParams).then((response) => {
				
			}).catch((error) => {
				console.error(error);
				this.props.post.favourited = false
				this.forceUpdate()
			});
		}
	}

	parseContent = (content) => {
		const notTags = content.split(/#\w+/g)
		const tags = content.match(/#\w+/g)

		let output = []

		for (let i = 0; i < notTags.length - 1; i++) {
			output.push(notTags[i])
			output.push(<span key={i} className="content-hashtag accent" onClick={ () => { this.props.store.trySearch(tags[i]) } }>{ tags[i] }</span>)
		}

		output.push(notTags[notTags.length - 1])

		return output
	}

	render() {
		const { post } = this.props;

		if (post === undefined) {
			return(
				<div className="Post shadow mid-grey light-grey-text">Click a post on the map to see it!</div>
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
					{ post.location.name.split(",")[0] }
				</div> : ''
			}

			<div className="PostContent">
				{ this.parseContent(post.content) }
			</div>
			{post.images.length > 0 && <div className="PostImage">
				<img src={ post.images[0] }/>
			</div>} 

			<textarea
			className="permalinkCopy"
            ref={(textarea) => this.textArea = textarea}
            value={window.location.href + "permalink?post=" + this.props.post.postID}
          	/>

			<div className="PostUploadTime">
				{ '' + month[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear() }
			</div>

			{ post.email ? <div className="PostEmail">Uploaded by: { post.email }</div> : '' }

			{ (this.props.store.currentView === 'My Posts' || this.props.store.admin) ? <div className="delete-button fa fa-trash" onClick={ this.confirmDeletion }></div> : '' }

			<div className={this.state.copySuccess ? "permalinkMessageOn" : "permalinkMessageOff"}>Post link copied to clipboard!</div>

			<div className={ 'favourite-button fa ' + (post.favourited ? 'fa-star accent' : 'fa-star-o') } onClick={ this.favouritePost }></div>

			<Modal parent={ this } visible={ this.state.modalVisible } prompt="Are you sure you sure you want to delete this post?"
				positiveButtonAction={ this.deletePost } negativeButtonAction={ () => { this.setState({ modalVisible: false }) } } 
				positiveButtonText="Delete" negativeButtonText="Cancel"/>
		</div>
	)}
};

export default Post;
