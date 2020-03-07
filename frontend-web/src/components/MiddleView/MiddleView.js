import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import Settings from '../Settings/Settings'
import CreatePost from '../CreatePost/CreatePost'

class MiddleView extends React.Component {
	state = {}

	currentViewSwitch = (currentView) => {
		switch(currentView) {
			case 'Favourites':
				return <PostFeed store={ this.props.store } feedType="Favourites" />;
			case 'My Posts':
				return <PostFeed store={ this.props.store } feedType="My Posts" />;
			case 'Settings':
				return <Settings store={ this.props.store } />;
			default:
				return <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } feedType="Home" /></div>;
		}
	}

	render() {
		return (
		<div className="MiddleView dark-grey light-grey-text">
			{ this.currentViewSwitch(this.props.currentView) }
		</div>
	)}
};

export default MiddleView;
