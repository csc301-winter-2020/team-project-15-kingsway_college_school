import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'
import Login from './components/Login/Login'

import globalStore from './Store.js'
import Amplify from 'aws-amplify'
import Permalink from "./components/Permalink/Permalink"

class App extends React.Component {
	state = {
		store: null
	}

	constructor() {
		super()

		this.state = {
			store: globalStore
		}

		const session = sessionStorage.getItem('kcs_session')
		if (session) {
			const parsedSession = JSON.parse(session)
			const now = new Date()
			if (now.setHours(now.getHours() - 1) < new Date(parsedSession.idToken.payload.auth_time * 1000)) {
				// if you have authenticated in past hour
				this.state.store.session = parsedSession
				this.state.store.user = parsedSession.idToken.payload['email']
				this.state.store.userID = parseInt(parsedSession.idToken.payload['custom:userID'])
				this.state.store.admin = parsedSession.idToken.payload['custom:admin'].toLowerCase() === 'true'
			} else {
				sessionStorage.removeItem('kcs_session')
			}
		}
		this.initBackendConfiguration()
	}

	initBackendConfiguration = () => {
		Amplify.configure({
			API: {
				endpoints: [
					{
						name: 'getPosts',
						endpoint: this.state.store.devApiEndpoint + '/getPosts',
						service: 'api-gateway',
						region: 'us-east-1'
					},
					{
						name: 'deletePost',
						endpoint: this.state.store.apiEndpoint + '/deletePost',
						service: 'api-gateway',
						region: 'us-east-1'
					},
					{
						name: 'newPost',
						endpoint: this.state.store.apiEndpoint + '/newPost',
						service: 'api-gateway',
						region: 'us-east-1'
					},
					{
						name: 'favouritePost',
						endpoint: this.state.store.apiEndpoint + '/favouritePost',
						service: 'api-gateway',
						region: 'us-east-1'
					},
					{
						name: 'unfavouritePost',
						endpoint: this.state.store.apiEndpoint + '/unfavouritePost',
						service: 'api-gateway',
						region: 'us-east-1'
					},
					{
						name: 'getPopularHashtags',
						endpoint: this.state.store.apiEndpoint + '/getPopularHashtags',
						service: 'api-gateway',
						region: 'us-east-1',
					},
					{
						name: 'getLocations',
						endpoint: this.state.store.devApiEndpoint + '/getLocations',
						service: 'api-gateway',
						region: 'us-east-1'
					}
				]
			},
			Auth: {
				region: 'us-east-1',
				userPoolId: 'us-east-1_jXw5z0sO3',
				userPoolWebClientId: '2be70uebsba896oah66e7gduua',
				identityPoolId: 'us-east-1:b2f0fb38-17fc-43a6-98db-6c372e572f0e',
				mandatorySignIn: true,
				authenticationFlowType: 'USER_PASSWORD_AUTH',
			}
		});
	}
	
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() => (this.state.store.session ? <HomePage store={ this.state.store } /> : <Login store={ this.state.store } destination='/'/>)}/>
						<Route exact path='/permalink' render={() => (this.state.store.session ? <Permalink store={ this.state.store } /> : <Login store={ this.state.store } destination={window.location.pathname +  window.location.search}/>)}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;