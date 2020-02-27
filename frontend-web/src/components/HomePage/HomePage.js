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
		currentView: 'Home'
	}

	currentViewSwitch = () => {
		switch(this.state.currentView) {
			case 'Home':
				return <PostFeed />;
			case 'Favourites':
				return <Favourites />;
			case 'My Posts':
				return <MyPosts />;
			case 'Settings':
				return <Settings />;
			default:
				return <PostFeed />;
		}
	}

	render() {
		return (
		<div className="HomePage">
			<TabMenu parent={ this } />
			{ this.currentViewSwitch(this.state.currentView) }
			<Explore />
		</div>
	)}
};

export default HomePage;
