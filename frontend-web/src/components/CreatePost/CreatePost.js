import React from 'react';
import { uid } from "react-uid";
import './CreatePost.css';

class CreatePost extends React.Component {
	state = {}

	render() {
		return (
		<div className={ 'CreatePost light-grey-text ' + (this.props.wide ? 'thin' : '') }>
			<div className="TextAreaContainer">
				<textarea id="new-post-textarea" rows="4" onChange={ this.TextAreaChange } placeholder="Share an experience"/>
			</div>
			<div className="CreatePostButtons">
				<div className="AttachPicture fa fa-paperclip"></div>
				<button className="ShareButton light-grey dark-grey-text">Share</button>
			</div>
		</div>
	)}
};

export default CreatePost;
