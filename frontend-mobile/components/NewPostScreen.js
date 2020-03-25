import React, { Component, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert, Image, View, StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Amplify from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

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
		this.getLocation = this.getLocation.bind(this)
		this.getPhotosFromGallery = this.getPhotosFromGallery.bind(this)
		this.getPermissionAsync = this.getPermissionAsync.bind(this)

	}
	state = {
		text: '',
		image: null
	}


	getLocation() {
		if (hasLocationPermission) {
			Geolocation.getCurrentPosition(
				// Add capability to link location here.
				(position) => {
					console.log(position);
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		}
	}
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	}

	async getPhotosFromGallery() {
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


		Amplify.API.post('newPost', '', reqParams).then((response) => {
			console.log("Post submitted")
			Alert.alert("Post submitted", ":)")
		}).catch((error) => {
			console.log(error);
			console.log(error.response)
		});
		Keyboard.dismiss();
		this.textInput.clear();

	}

	componentDidMount() {
		this.getPermissionAsync();
		console.log('hi');
	}

	render() {
		console.log("State:")
		if (this.state.image != null) {
			console.log(this.state.image.substring(0, 20))

		}
		let image = null;
		if (this.state.image != null) {
			image = <Image style={styles.image} source={{ uri: this.state.image }} />
		}
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView style={{ flex: 7 }} resetScrollToCoords={{ x: 0, y: 0 }}>
					<View style={{ flex: this.state.image == null ? 1 : 2, backgroundColor: "#292654", borderRadius: 20, marginHorizontal: side_margins, padding: 20, }}>
						<View style={{ flex: 1 }}>
							<TextInput
								ref={input => { this.textInput = input }}
								style={styles.TextInputStyleClass}
								placeholder={"Share what you've learnt!"}
								placeholderTextColor="#9E9E9E"
								borderBottomColor='#000000'
								numberOfLines={10}
								multiline={true}
								onChangeText={(text) => this.newInputText(text)}
							/>

						</View>
						{image}
					</View>

					<View style={{ flexDirection: 'row', justifyContent: "space-between", flex: 1 }}>

						<View style={styles.addFiles}>
							<Icon name="location-on" color="#2A5AD5" raised={true} reverse={true} onPress={() => this.getLocation()} />
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
	}
});
