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
			<TabMenu store={ this.props.store } parent={ this } />
			<MiddleView store={ this.props.store } currentView={ this.state.currentView } />
			<TopTags store={ this.props.store } />
		</div>
	)}
};

export default HomePage;
