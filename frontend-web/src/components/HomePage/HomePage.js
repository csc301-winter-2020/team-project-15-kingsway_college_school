import React from 'react';
import './HomePage.css';
import 'font-awesome/css/font-awesome.min.css';

import MiddleView from '../MiddleView/MiddleView'
import Explore from '../Explore/Explore'
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
			<Explore parent={ this } />
		</div>
	)}
};

export default HomePage;
