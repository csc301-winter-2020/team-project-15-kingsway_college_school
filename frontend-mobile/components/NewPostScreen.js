import React, { Component, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert, Image, View, StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Amplify from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const side_margins = 16
const Tab = createBottomTabNavigator();

// New Post Header for the page
class NewPostHeader extends Component {
	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>New Post</Text>
			</View>
		)
	}
}

class NewPostBody extends Component {
	constructor() {
		super();
		this.newInputText = this.newInputText.bind(this)
		this.getPhotosFromGallery = this.getPhotosFromGallery.bind(this)
		this.getPermissionAsync = this.getPermissionAsync.bind(this)
		this.getLocationAsync = this.getLocationAsync.bind(this)
		this.toggleLocation = this.toggleLocation.bind(this)

	}
	state = {
		text: '',
		image: null,
		locationOn: false,
		location: null,
		errorMessage: null
	}


	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	}
	toggleLocation() {
		if (this.state.locationOn) {
			this.setState({ locationOn: false, location: null })
		} else {
			this.setState({ locationOn: true })
			this.getLocationAsync();
		}

	}
	getLocationAsync = async () => {
		// We first get the location
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		//this.setState({ location });
		//console.log(location)

		// Then we get the name from mapbox
		var xhr = new XMLHttpRequest();

		xhr.onload = () => {
			try {
				let full_name = JSON.parse(xhr.responseText).features[0].place_name;

				this.setState({ location: { name: full_name, latitude: location.coords.latitude.toFixed(4).toString(), longitude: location.coords.longitude.toFixed(4).toString() } })
			} catch { }
		}

		// Only uses POI (points of interests --> remove this to get the best guess address at current location)
		xhr.open('GET', `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coords.longitude},${location.coords.latitude}.json?types=poi&access_token=pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ`);
		xhr.responseType = 'text';
		xhr.send();
	};

	async getPhotosFromGallery() {
		this.getPermissionAsync();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
			base64: true

		});

		if (!result.cancelled) {
			this.setState({ image: "data:image/jpg;base64," + result.base64 });
		}
	}

	newInputText(text) {
		this.state.text = text
	}

	submitPost() {
		console.log(this.state.text)
		console.log("Submitting Post");
		const imageParam = this.state.image ? [this.state.image] : [];

		const reqParams = { body: { content: this.state.text, images: imageParam } };
		if (this.state.location != null) {
			reqParams.body["location"] = this.state.location
		}

		Amplify.API.post('newPost', '', reqParams).then((response) => {
			console.log("Post submitted")
			Alert.alert("Success", "Post submitted")
		}).catch((error) => {
			console.log(error);
			console.log(error.response)
			console.log(reqParams)

		});
	    
		this.setState({ image: null })
		Keyboard.dismiss();
		this.textInput.clear();

	}

	render() {

		let image = null;
		if (this.state.image != null) {
			image = <Image style={styles.image} source={{ uri: this.state.image }} />
		}
		let location = null;
		if (this.state.location != null) {
			location = (
				<View style={{ marginHorizontal: side_margins, marginBottom: 10 }}>
					<Text style={styles.locationText}>@{this.state.location.name.split(',')[0]}</Text>
				</View>

			)
		}
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView style={{ flex: 5 }} resetScrollToCoords={{ x: 0, y: 0}}>
					{location}
					<View style={{ flex: this.state.image == null ? 1 : 2, backgroundColor: "#292654", borderRadius: 20, marginHorizontal: side_margins, padding: 20, }}>
						<View style={{ flex: 1 }}>
							<TextInput
								ref={input => { this.textInput = input }}
								style={styles.TextInputStyleClass}
								placeholder={"Share what you've learnt!"}
								placeholderTextColor="#9E9E9E"
								borderBottomColor='#000000'
								numberOfLines={5}
								multiline={true}
								onChangeText={(text) => this.newInputText(text)}
							/>

						</View>
						{image}
					</View>

					<View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>

						<View style={styles.addFiles}>
							<Icon name="location-on" color={this.state.location == null ? "#2A5AD5" : "orange"} raised={true} reverse={true} onPress={() => this.toggleLocation()} />
							<Icon name="camera-alt" color="#2A5AD5" raised={true} reverse={true} onPress={() => this.getPhotosFromGallery()} />
						</View>

						<View style={styles.submitPost}>
							<Icon name="check" color="#28B11D" raised={true} reverse={true} onPress={() => this.submitPost()} />
						</View>

					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback >
		)
	}
}

export default class NewPostScreen extends Component {
	render() {
		return (
			<View style={styles.view}>
				<NewPostHeader />
				<NewPostBody />
			</View>

		)
	}
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: '#110d41'
	},
	header: {
		flex: 1,
		marginTop: side_margins / 2,
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	TextInputStyleClass: {
		textAlign: 'left',
		textAlignVertical: 'top',
		color: '#FFFFFF',
	},
	addFiles: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginHorizontal: side_margins,
	},
	submitPost: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginRight: 10,
	},
	image: {
		flex: 1,
		height: null,
		width: null,
		resizeMode: "contain",
	},
	locationText: {
		fontSize: 15,
		color: '#fcfcff',
		fontWeight: 'bold',
		fontStyle: 'italic',
		paddingRight: 10
	},
});
