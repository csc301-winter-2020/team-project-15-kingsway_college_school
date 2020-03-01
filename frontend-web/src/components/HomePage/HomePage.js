import React from 'react';
import './HomePage.css';
import 'font-awesome/css/font-awesome.min.css';

import MiddleView from '../MiddleView/MiddleView'
import TopTags from '../TopTags/TopTags'
import TabMenu from '../TabMenu/TabMenu'

class HomePage extends React.Component {
	state = {
		currentView: 'Home'
	}

	render() {
		return (
		<div className="HomePage dark-grey">
			<TabMenu parent={ this } />
			<MiddleView currentView={ this.state.currentView } />
			<TopTags parent={ this } />
		</div>
	)}
};

export default HomePage;
