import React from 'react';
import './SearchUser.css';

import PostFeed from '../PostFeed/PostFeed'

class SearchUser extends React.Component {
	state = {
		email_input: undefined
	}

	render() {
		return (
		<div className="SearchUser">
			<form onSubmit={ (e) => { e.preventDefault(); this.searchUser(this.state.email_input.value) } }>
			<div className="SearchUserHeader">
				Get posts for a user
			</div>
			<div className="SearchUserInputWrapper light-grey-text">
					<input type="text" placeholder="Email Address" name="email" ref={ (input) => this.state.email_input = input }/>
			</div>
			</form>

			 <PostFeed store={ this.props.store } parent={ this } preventDefaultLoad={ true } />
		</div>
	)}
};

export default SearchUser;
