import React from 'react';
import { uid } from "react-uid";
import './CreatePost.css';

class CreatePost extends React.Component {
	state = {}

	render() {
		return (
		<div className="CreatePost light-grey-text">
			<div className="TextAreaContainer shadow">
				<textarea id="new-post-textarea" onChange={ this.TextAreaChange } placeholder="Share an experience"/>
			</div>
			<div className="CreatePostButtons">
				<div className="AttachPicture fa fa-paperclip"></div>
				<button className="ShareButton shadow light-grey dark-grey-text">Share</button>
			</div>
		</div>
	)}
};

export default CreatePost;
