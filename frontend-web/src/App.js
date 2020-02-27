import React from 'react';

// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage'

class App extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' render={() => (<HomePage/>)}/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;