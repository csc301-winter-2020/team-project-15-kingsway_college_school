import React from 'react';
import { uid } from "react-uid";
import './TabMenu.css';

class TabMenu extends React.Component {
	state = {
		selected: 'Home',
		tabs: [
			'Home',
			// 'Favourites',
			// 'Settings',
			'My Posts',
			'Explore'
		]
	}

	tabClicked = (tab) => {
		this.setState({ selected: tab });

		this.props.parent.setState({ currentView: tab });
	}

	render() {
		return (
		<div className="TabMenu dark-grey light-grey-text">
			<h1>
				KCShare
			</h1>
			{
				this.state.tabs.map((tab) => (
					<div key={ uid(tab) } onClick={ () => { this.tabClicked(tab) } } className={'Tab rounded ' + (this.state.selected === tab ? 'mid-grey selected' : 'dark-grey')}>
						{ tab }
					</div>
				))
			}
		</div>
	)}
};

export default TabMenu;
