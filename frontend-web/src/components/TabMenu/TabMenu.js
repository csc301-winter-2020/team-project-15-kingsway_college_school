import React from 'react';
import { uid } from "react-uid";
import './TabMenu.css';

class TabMenu extends React.Component {
	state = {
		selected: 'Home',
		tabs: [
			'Home',
			'Favourites',
			'My Posts',
			'Settings'
		]
	}

	tabClicked = (tab) => {
		const currState = this.state;

		currState.selected = tab;

		this.setState(currState);

		const parentState = this.props.parent.state;

		parentState.currentView = tab;

		this.props.parent.setState(parentState);
	}

	render() {
		return (
		<div className="TabMenu mid-grey light-grey-text">
			<h1>
				KCShare
			</h1>
			{
				this.state.tabs.map((tab) => (
						<div key={ uid(tab) } onClick={ () => { this.tabClicked(tab) } } className={'Tab accent ' + (this.state.selected === tab ? 'dark-grey' : 'mid-grey')}>
							{ tab }
						</div>
				))
			}
		</div>
	)}
};

export default TabMenu;
