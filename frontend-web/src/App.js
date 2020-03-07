import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'
import globalStore from './Store.js'

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