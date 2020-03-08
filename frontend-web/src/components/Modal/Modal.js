import React from 'react';
import { uid } from "react-uid";
import './Modal.css';

class Modal extends React.Component {
	state = {}

	render() {
		return (
		<div className={ 'Modal ' + ( this.props.visible ? 'visible' : 'hidden' ) }>
			<div className="overlay" onClick={ () => { this.props.parent.setState({ modalVisible: false }) } }></div>

			<div className="ModalContent mid-grey light-grey-text">
				<h1>{ this.props.prompt }</h1>
				<button onClick={ this.props.negativeButtonAction }>{ this.props.negativeButtonText }</button>
				<button onClick={ this.props.positiveButtonAction }>{ this.props.positiveButtonText }</button>
			</div>
		</div>
	)}
};

export default Modal;
