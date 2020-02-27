import React from 'react';
import { uid } from "react-uid";
import './Favourites.css';

class Favourites extends React.Component {
	state = {}

	render() {
		return (
		<div className={ 'Favourites dark-grey light-grey-text ' + (this.props.wide ? 'thin' : '') }>
			Favourites
		</div>
	)}
};

export default Favourites;
