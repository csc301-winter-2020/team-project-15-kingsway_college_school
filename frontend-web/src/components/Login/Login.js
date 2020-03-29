import React from 'react';
import './Login.css';

import Amplify from 'aws-amplify';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
	state = {
		email_input: undefined,
		password_input: undefined,
		signInFailed: undefined
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		

		const signInSucceeded = await this.props.store.SignIn(this.state.email_input.value, this.state.password_input.value)

		this.setState({ signInFailed: !signInSucceeded })

		if (signInSucceeded) {
			sessionStorage.setItem('kcs_session', JSON.stringify(this.props.store.session))
			console.log(this.props.destination)
			this.props.history.push(this.props.destination)
		}
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
			<div className="Login dark-grey light-grey-text">
				<div className="FormBox rounded mid-grey shadow">
					<div className="LoginTitle">Login</div>
					<div className={ 'LoginFailed ' + (this.state.signInFailed ? 'error' : 'hidden') }>
						Email or password was incorrect. Please try again.
					</div>
					<div className="LoginEmail">
						<div className="LoginSubtitle">
							Email
						</div>
						<div className="LoginField rounded shadow">
							<input ref={ (input) => this.state.email_input = input } type="text" placeholder=""/>
						</div>
					</div>
					<div className="LoginPassword">
						<div className="LoginSubtitle">
							Password
						</div>
						<div className="LoginField rounded shadow">
							<input ref={ (input) => this.state.password_input = input } type="password" placeholder=""/>
						</div>
					</div>
					<input type="submit" className="LoginSubmit rounded mid-mid-grey light-grey-text shadow"/>
				</div>
			</div>
		</form>
	)}
};

export default withRouter(Login);
