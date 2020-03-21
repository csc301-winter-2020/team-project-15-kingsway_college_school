import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'
import globalStore from './Store.js'
import Amplify from 'aws-amplify';
import { observable } from "mobx";

let username = "devin"
let password = "bing0Bang@@"
let email = "asdf@gmail.com"
globalStore.user = observable.box(globalStore.user)
globalStore.session = observable.box(globalStore.session)

class App extends React.Component {
	state = {
		store: null
	}

	constructor() {
		super()

		this.state = {
			store: globalStore
		}

	}
	
	async componentDidMount(){
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
		await this.state.store.SignIn(username, password)
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() => (<HomePage store={ this.state.store } />)}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;