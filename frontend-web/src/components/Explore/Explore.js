import React from 'react';
import { uid } from "react-uid";
import './Explore.css';

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
		<div className="Explore mid-grey light-grey-text">
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
