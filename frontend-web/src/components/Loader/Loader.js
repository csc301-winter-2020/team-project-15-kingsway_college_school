import React from 'react';
import './Loader.css';
// https://loading.io/css/

class Loader extends React.Component {
	state = {}

	render() {
		return (
		<div className="Loader">
			<div class="lds-ripple"><div></div><div></div></div>
		</div>
	)}
};

export default Loader;
