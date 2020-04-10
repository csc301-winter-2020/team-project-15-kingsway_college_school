import React from 'react';
import { uid } from "react-uid";
import './TabMenu.css';
import { withRouter } from "react-router-dom";

class TabMenu extends React.Component {
	state = {
		selected: 'Home',
		tabs: this.props.store.admin ? [
			{name: 'Home', icon:''},
			{name: 'Favourites', icon:''},
			{name: 'My Posts', icon:''},
			{name: 'Search User', icon:''},
			{name: 'Explore', icon:''},
			{name:'Sign Out', icon:''}
		] : [
			{name: 'Home', icon:'fa fa-home'},
			{name: 'Favourites', icon:'fa fa-heart'},
			{name: 'My Posts', icon:'fa fa-user'},
			{name: 'Explore', icon: 'fa fa-map-marker'},
			{name:'Sign Out', icon:''}
		]
	}

	changeToHome = (searchTerm) => {
		this.setState({ selected: 'Home' });

		this.props.store.setCurrentView('Home', searchTerm)
	}

	tabClicked = (tab) => {
		tab = tab.target.innerText

		if (tab === 'Sign Out') {
			sessionStorage.removeItem('kcs_session')
			this.props.store.session = null
			this.props.history.push('/')
			return
		}

		this.setState({ selected: tab });

		this.props.store.setCurrentView(tab)
		this.props.store.updateFeeds();
	}

	componentDidMount() {
		this.props.store.changeTab = this.changeToHome;
	}

	render() {
		return (
		<div className="TabMenu dark-grey light-grey-text">
			<h1>
				KCShare
				{ this.props.store.admin ? <span className="accent"><br/>ADMIN</span> : '' }
			</h1>
			
			{
				this.state.tabs.map((tab) => (
					<div key={ uid(tab.name) } onClick={ this.tabClicked } className={'Tab rounded ' + (this.state.selected === tab.name ? 'mid-grey selected' : 'dark-grey')}>
						<i className={"TabIcon " + tab.icon}></i>{ " " + tab.name }
					</div>
				))
			}
		</div>
	)}
};

export default withRouter(TabMenu);
