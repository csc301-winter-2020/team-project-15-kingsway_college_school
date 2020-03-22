import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'
import Login from './components/Login/Login'

import globalStore from './Store.js'
import Amplify from 'aws-amplify';
import { observable } from "mobx";

// let username = "devin"
// let password = "bing0Bang@@"
// let email = "asdf@gmail.com"
// globalStore.user = observable.box(globalStore.user)
// globalStore.session = observable.box(globalStore.session)

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
			console.log(session)
			this.state.store.session = JSON.parse(session)
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