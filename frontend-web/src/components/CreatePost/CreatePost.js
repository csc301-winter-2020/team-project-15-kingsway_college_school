import React from 'react';
import { uid } from "react-uid";
import './CreatePost.css';

class CreatePost extends React.Component {
	state = {
		postData: '',
		attachment: null
	}

	postDataChanged = (e) => {
		this.setState({ postData: e.target.value });
	}

	fileUploaded = (e) => {
		this.setState({ attachment: e.target.files[0] });
	}

	handleSubmit = (e) => {
		e.preventDefault();

		console.log(this.state.postData, this.state.attachment)
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
		<div className="CreatePost light-grey-text">
			<div className="TextAreaContainer shadow">
				<textarea id="new-post-textarea" onChange={ this.postDataChanged } placeholder="Share an experience"/>
			</div>
			<div className="CreatePostButtons">
				<input id="fileUpload" type="file" name="file" className="hidden" onChange={ this.fileUploaded }/>
				<label htmlFor="fileUpload" className="AttachPicture fa fa-paperclip"></label>
				<input type="submit" className="ShareButton shadow light-grey dark-grey-text" value="Share" />
			</div>
		</div>
		</form>
	)}
};

export default CreatePost;
