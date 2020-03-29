import React from 'react';
import './Permalink.css';
import 'font-awesome/css/font-awesome.min.css';

import PostFeed from '../PostFeed/PostFeed'

import {withRouter} from "react-router-dom"

class Permalink extends React.Component {
	state = {
		currentView: 'Home'
	}

	// componentDidMount(){
	// 	//console.log("did mount")
	// 	// this.props.store.permalinkPostID = "100"
	// 	// this.props.store.updateFeeds();
	// }

	render() {
		//this.props.store.permalinkPostID = "100"
		this.props.store.currentView = "Permalink"
		// console.log(this.props.location)
		// console.log(this.props.location.search)
		let postID = new URLSearchParams(this.props.location.search).get("post")
		console.log(postID)
		postID === null ? this.props.store.permalinkPostID = 0 : this.props.store.permalinkPostID = postID

		return (
		<div className="Permalink dark-grey">
			<PostFeed store={ this.props.store } />
		</div>
	)}
};

export default withRouter(Permalink);
