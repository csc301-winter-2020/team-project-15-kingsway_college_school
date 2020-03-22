import React from 'react';
import './Login.css';

import Amplify from 'aws-amplify';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
	state = {
		username_input: undefined,
		password_input: undefined,
		signInFailed: undefined
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		Amplify.configure({
			Auth: {
		
				// REQUIRED - Amazon Cognito Region
				region: 'us-east-1',
		
				// OPTIONAL - Amazon Cognito User Pool ID
				userPoolId: 'us-east-1_jXw5z0sO3',
		
				// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
				userPoolWebClientId: '2be70uebsba896oah66e7gduua',
				identityPoolId: 'us-east-1:b2f0fb38-17fc-43a6-98db-6c372e572f0e',
		
				// OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
				mandatorySignIn: true,
		
				// OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
				authenticationFlowType: 'USER_PASSWORD_AUTH',
			}
		});

		const signInSucceeded = await this.props.store.SignIn(this.state.username_input.value, this.state.password_input.value)

		console.log(signInSucceeded)

		this.setState({ signInFailed: !signInSucceeded })

		if (signInSucceeded) {
			sessionStorage.setItem('kcs_session', JSON.stringify(this.props.store.session))
			this.props.history.push('/')
		}
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
			<div className="Login dark-grey light-grey-text">
				<div className="FormBox mid-grey shadow">
					<div className="LoginTitle">Login</div>
					<div className={ 'LoginFailed ' + (this.state.signInFailed ? 'error' : 'hidden') }>
						Username or password was incorrect. Please try again.
					</div>
					<div className="LoginUsername">
						<div className="LoginSubtitle">
							Username
						</div>
						<div className="LoginField shadow">
							<input ref={ (input) => this.state.username_input = input } type="text" placeholder=""/>
						</div>
					</div>
					<div className="LoginPassword">
						<div className="LoginSubtitle">
							Password
						</div>
						<div className="LoginField shadow">
							<input ref={ (input) => this.state.password_input = input } type="password" placeholder=""/>
						</div>
					</div>
					<input type="submit" className="LoginSubmit mid-mid-grey light-grey-text shadow"/>
				</div>
			</div>
		</form>
	)}
};

export default withRouter(Login);
