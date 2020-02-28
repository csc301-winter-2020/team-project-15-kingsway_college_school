import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import Favourites from '../Favourites/Favourites'
import MyPosts from '../MyPosts/MyPosts'
import Settings from '../Settings/Settings'
import CreatePost from '../CreatePost/CreatePost'

class MiddleView extends React.Component {
	state = {}

	currentViewSwitch = (currentView, searchBarActive) => {
		switch(currentView) {
			case 'Favourites':
				return <Favourites className="scrollable" wide={ searchBarActive } />;
			case 'My Posts':
				return <MyPosts className="scrollable" wide={ searchBarActive } />;
			case 'Settings':
				return <Settings className="scrollable" wide={ searchBarActive } />;
			default:
				return <div className="scrollable"><CreatePost wide={ searchBarActive } /><PostFeed wide={ searchBarActive } /></div>;
		}
	}

	render() {
		return (
		<div className="MiddleView dark-grey light-grey-text">
			{ this.currentViewSwitch(this.props.currentView, this.props.wide) }
		</div>
	)}
};

export default MiddleView;
