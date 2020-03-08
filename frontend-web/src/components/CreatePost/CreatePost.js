import React from 'react';
import { uid } from "react-uid";
import './CreatePost.css';
import Amplify from 'aws-amplify';

class CreatePost extends React.Component {
	state = {
		postData: '',
		attachment: undefined,
		lat: undefined,
		long: undefined,
		locName: undefined
	}

	postDataChanged = (e) => {
		this.setState({ postData: e.target.value });
	}

	fileUploaded = (e) => {
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			this.setState({ attachment: reader.result.slice(reader.result.indexOf(',') + 1) });
		}, false);

		reader.readAsDataURL(e.target.files[0])
	}

	handleSubmit = (e) => {
		e.preventDefault();

		Amplify.configure({
			API: {
				endpoints: [{
					name: 'newPost',
					endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/newPost',
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});

		const imageParam = JSON.stringify(this.state.attachment ? [ this.state.attachment ] : []);

		const reqParams = { body: { userID: 2, content: this.state.postData, images: imageParam,
							location: { name: this.state.locName, latitude: this.state.lat.toString(), longitude: this.state.long.toString() } } };

		Amplify.API.post('newPost', '', reqParams).then((response) => {
			this.props.store.updateFeeds();
		}).catch((error) => {
			console.log(error);
		});

		this.setState({ modalVisible: false })
		e.target.reset();
	}

	acquiredLocation = (pos) => {
		const latitude  = pos.coords.latitude;
    	const longitude = pos.coords.longitude;

    	var xhr = new XMLHttpRequest();

    	xhr.onload = () => {
			let full_name = JSON.parse(xhr.responseText).features[0].place_name;
			let names = full_name.split(',');
			let place = names[0];
			let city = names[1];

    		this.setState({ locName: [place, city].join(', ')})
    	}

    	xhr.open('GET', `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ`);
    	xhr.responseType = 'text';
    	xhr.send();

    	this.setState({ lat: latitude, long: longitude });
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(this.acquiredLocation, undefined);
	}

	render() {
		return (
		<form onSubmit={ this.handleSubmit }>
		<div className="CreatePost light-grey-text">
			<div className="TextAreaContainer shadow">
				<textarea id="new-post-textarea" onChange={ this.postDataChanged } placeholder="Share an experience"/>
			</div>
			<div className="CreatePostButtons">
				<input id="fileUpload" type="file" name="file" className="hidden" onChange={ this.fileUploaded }/>
				<label htmlFor="fileUpload" className="AttachPicture fa fa-paperclip"></label>
				<input type="submit" className="ShareButton shadow light-grey dark-grey-text" value="Share" />
			</div>
		</div>
		</form>
	)}
};

export default CreatePost;
