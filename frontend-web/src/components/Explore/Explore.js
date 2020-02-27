import React from 'react';
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
						<div className="Hashtag">
							{ hashtag }
						</div>
				))
			}
		</div>
	)}
};

export default Explore;
