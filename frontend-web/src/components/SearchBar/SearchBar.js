import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	state = {
		searchTerm: ''
	}

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.search(this.state.searchTerm);
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
			<div className="SearchBar">
				<input type="text" onChange={ (e) => this.setState({ searchTerm: e.target.value }) } placeholder="Search for a post"/>
				<input type="submit" className="hidden"/>
			</div>
		</form>
	)}
};

export default SearchBar;
