import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import Favourites from '../Favourites/Favourites'
import MyPosts from '../MyPosts/MyPosts'
import Settings from '../Settings/Settings'
import CreatePost from '../CreatePost/CreatePost'

class MiddleView extends React.Component {
	state = {}

	currentViewSwitch = (currentView) => {
		switch(currentView) {
			case 'Favourites':
				return <Favourites className="scrollable" />;
			case 'My Posts':
				return <MyPosts className="scrollable" />;
			case 'Settings':
				return <Settings className="scrollable" />;
			default:
				return <div className="scrollable"><CreatePost /><PostFeed /></div>;
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
