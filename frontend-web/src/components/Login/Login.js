import React from 'react';
import './Login.css';

class Login extends React.Component {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log(e)
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
			<div className="Login dark-grey light-grey-text">
				<div className="FormBox mid-grey shadow">
					<div className="LoginTitle">Login</div>
					<div className="LoginEmail">
						<div className="LoginSubtitle">
							Email
						</div>
						<div className="LoginField shadow">
							<input type="text" placeholder=""/>
						</div>
					</div>
					<div className="LoginPassword">
						<div className="LoginSubtitle">
							Password
						</div>
						<div className="LoginField shadow">
							<input type="password" placeholder=""/>
						</div>
					</div>
					<input type="submit" className="LoginSubmit mid-mid-grey light-grey-text shadow"/>
				</div>
			</div>
		</form>
	)}
};

export default Login;
