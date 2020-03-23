import React from 'react';
import './Loader.css';
// https://loading.io/css/

class Loader extends React.Component {
	state = {}

	render() {
		return (
		<div className={ 'Loader ' + (this.props.short ? 'short' : '') }>
			<div className="lds-ripple"><div></div><div></div></div>
		</div>
	)}
};

export default Loader;
