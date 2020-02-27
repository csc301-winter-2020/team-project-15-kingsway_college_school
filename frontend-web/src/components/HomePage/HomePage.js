import React from 'react';
import './HomePage.css';

import PostFeed from '../PostFeed/PostFeed'
import Explore from '../Explore/Explore'
import TabMenu from '../TabMenu/TabMenu'

class HomePage extends React.Component {
	state = {}

	render() {
		return (
		<div className="HomePage">
			<TabMenu />
			<PostFeed />
			<Explore />
		</div>
	)}
};

export default HomePage;
