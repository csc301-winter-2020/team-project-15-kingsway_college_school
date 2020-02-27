import React from 'react';
import './HomePage.css';

import PostFeed from '../PostFeed/PostFeed'
import Favourites from '../Favourites/Favourites'
import MyPosts from '../MyPosts/MyPosts'
import Settings from '../Settings/Settings'
import Explore from '../Explore/Explore'
import TabMenu from '../TabMenu/TabMenu'

class HomePage extends React.Component {
	state = {
		currentView: 'Home',
		searchBarActive: false
	}

	currentViewSwitch = (currentView, searchBarActive) => {
		switch(currentView) {
			case 'Home':
				return <PostFeed wide={ searchBarActive } />;
			case 'Favourites':
				return <Favourites wide={ searchBarActive } />;
			case 'My Posts':
				return <MyPosts wide={ searchBarActive } />;
			case 'Settings':
				return <Settings wide={ searchBarActive } />;
			default:
				return <PostFeed wide={ searchBarActive } />;
		}
	}

	render() {
		return (
		<div className="HomePage">
			<TabMenu parent={ this } />
			{ this.currentViewSwitch(this.state.currentView, this.state.searchBarActive) }
			<Explore parent={ this } />
		</div>
	)}
};

export default HomePage;
