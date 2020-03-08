import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import Settings from '../Settings/Settings'
import CreatePost from '../CreatePost/CreatePost'
import Explore from '../Explore/Explore'

class MiddleView extends React.Component {
	state = {}

	currentViewSwitch = () => {
		switch(this.props.store.currentView) {
			// case 'Favourites':
			// 	return <PostFeed store={ this.props.store } feedType="Favourites" />;
			case 'My Posts':
				return <PostFeed store={ this.props.store } />;
			// case 'Settings':
			// 	return <Settings store={ this.props.store } />;
			case 'Explore':
				return <Explore store={ this.props.store } />;
			default:
				return <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } /></div>;
		}
	}

	render() {
		return (
		<div className="MiddleView dark-grey light-grey-text">
			{ this.currentViewSwitch() }
		</div>
	)}
};

export default MiddleView;
