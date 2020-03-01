import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	state = {
		isEmpty: true
	}

	SearchBarChange = (e) => {
		const state = this.state;
		const pState = this.props.parent.state;

		if (e.target.value.length === 0) {
			this.setState({ isEmpty: true });

			this.props.parent.setState({ wide: false });
			this.props.parent.cWidthChange(false);
		} else {
			this.setState({ isEmpty: false });

			this.props.parent.setState({ wide: true });
			this.props.parent.cWidthChange(true);
		}
	}

	render() {
		return (
		<div className="SearchBar">
			<input type="text" onChange={ this.SearchBarChange } placeholder="Search for a hashtag"/>
		</div>
	)}
};

export default SearchBar;
