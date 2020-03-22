import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'
import Login from './components/Login/Login'

import globalStore from './Store.js'
import Amplify from 'aws-amplify'

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
				this.state.store.user = parsedSession.username
				this.state.store.userID = parseInt(parsedSession.idToken.payload['custom:userID'])
				this.state.store.admin = parsedSession.idToken.payload['custom:admin']
			} else {
				sessionStorage.removeItem('kcs_session')
			}
		}
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() => (this.state.store.session ? <HomePage store={ this.state.store } /> : <Login store={ this.state.store } />)}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;