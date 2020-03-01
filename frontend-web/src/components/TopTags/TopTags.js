import React from 'react';
import { uid } from "react-uid";
import './TopTags.css';

import SearchBar from '../SearchBar/SearchBar'

class TopTags extends React.Component {
	state = {
		hashtags: [
			'#torontozoo',
			'#ohnotimmy',
			'#donaldtrump'
		]
	}

	render() {
		return (
		<div className="TopTags dark-grey light-grey-text">
			<SearchBar parent={ this } />

			<h1>
				TopTags
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

export default TopTags;
