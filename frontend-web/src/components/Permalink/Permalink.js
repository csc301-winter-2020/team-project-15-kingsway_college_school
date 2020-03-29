import React from 'react';
import './Permalink.css';
import 'font-awesome/css/font-awesome.min.css';

import PostFeed from '../PostFeed/PostFeed'

class Permalink extends React.Component {
	state = {
		currentView: 'Home'
	}

	componentDidMount(){
		console.log("did mount")
		this.props.store.setCurrentView('Permalink')
		this.props.store.id = "100"
		//this.props.store.updateFeeds();
	}

	render() {
		return (
		<div className="Permalink dark-grey">
			<PostFeed store={ this.props.store } />
		</div>
	)}
};

export default Permalink;
