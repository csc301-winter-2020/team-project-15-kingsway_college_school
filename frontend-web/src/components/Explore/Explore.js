import React from 'react';
import { uid } from "react-uid";
import './Explore.css';

import SearchBar from '../SearchBar/SearchBar'

class Explore extends React.Component {
	state = {
		wide: false,
		hashtags: [
			'#torontozoo',
			'#ohnotimmy',
			'#donaldtrump'
		]
	}

	cWidthChange = (searchBarActive) => {
		const pState = this.props.parent.state;

		pState.searchBarActive = searchBarActive;

		this.props.parent.setState(pState);
	}

	render() {
		return (
		<div className={ 'Explore mid-grey light-grey-text ' + (this.state.wide ? 'wide' : '') }>
			<SearchBar parent={ this } />

			<h1>
				Explore
			</h1>

			{
				this.state.hashtags.map((hashtag) => (
						<div key={ uid(hashtag) } className="Hashtag">
							{ hashtag }
						</div>
				))
			}
		</div>
	)}
};

export default Explore;
