import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	state = {}

	render() {
		return (
		<div className="SearchBar">
			<input type="text" placeholder="Search for a post"/>
		</div>
	)}
};

export default SearchBar;
