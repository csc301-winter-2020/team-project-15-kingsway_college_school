import React from 'react';
import './Login.css';

class Login extends React.Component {
	state = {}

	handleSubmit = (e) => {
		console.log(e)
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
			<div className="Login dark-grey light-grey-text">
				<div className="FormBox mid-grey shadow">
					<div className="LoginTitle">Login</div>
					<div className="LoginField">
						<input type="text" placeholder=""/>
					</div>
					<div className="LoginField">
						<input type="password" placeholder=""/>
					</div>
				</div>
				<input type="submit" className="hidden"/>
			</div>
		</form>
	)}
};

export default Login;
