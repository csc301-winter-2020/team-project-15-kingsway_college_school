import React from 'react';
import { uid } from "react-uid";
import './Explore.css';

import SearchBar from '../SearchBar/SearchBar'

class Explore extends React.Component {
	state = {
		hashtags: [
			'#torontozoo',
			'#ohnotimmy',
			'#donaldtrump'
		]
	}

	render() {
		return (
		<div className="Explore dark-grey light-grey-text">
			<SearchBar parent={ this } />

			<h1>
				Explore
			</h1>

			{
				this.state.hashtags.map((hashtag) => (
						<div key={ uid(hashtag) } className="Hashtag accent">
							{ hashtag }
						</div>
				))
			}
		</div>
	)}
};

export default Explore;
