import React, { Component } from 'react';
import { CameraRoll, Image, View, FlatList, StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { TabActions } from '@react-navigation/native';
//import Geolocation from 'react-native-geolocation-service';

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

// Adding attachments to the new post
class NewPostButtons extends Component {
	
	getLocation() {
		if (hasLocationPermission) {
			Geolocation.getCurrentPosition(
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

	getPhotosFromGallery() {
		CameraRoll.getPhotos({ first: 1000000 })
		  .then(res => {
			let photoArray = res.edges;
			this.setState({ showPhotoGallery: true, photoArray: photoArray })
		  })
	}

	submitPost() {
		console.log("Submitting Post")
	}

	render() {
		return (
		<View style={styles.addFiles}>
			<Icon name="location-on" color="#2A5AD5" raised={true} reverse={true} onPress={() => this.getLocation()}/>
			<Icon name="camera-alt" color="#2A5AD5" raised={true} reverse={true} onPress={() => this.getPhotosFromGallery()}/>
			<Icon name="check" color="#28B11D" raised={true} reverse={true} onPress={() =>this.submitPost}/>
		</View>
		)
	}
}

class NewPostText extends Component {
	render() {
		return (
			<KeyboardAvoidingView style={{flex:8}} behavior="padding" keyboardVerticalOffset={100}>
			<TextInput
				style={styles.TextInputStyleClass}
				placeholder={"Share what you've learnt!"}
				placeholderTextColor="#9E9E9E"
				borderBottomColor='#000000'
				numberOfLines={10}
				multiline={true}
			/>
			<NewPostButtons/>
			</KeyboardAvoidingView>
		)
	} 
}

export default class NewPostScreen extends Component {
  render() {
      return (
	  <View style={styles.view}>
		  <NewPostHeader/>

		  <NewPostText/>
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
		flex:1,
		marginTop: side_margins/2,
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
		color:'#FFFFFF',
		height: 200,
		borderRadius: 20,
		backgroundColor : "#292654",
		padding: 20,
		marginHorizontal: side_margins,
	},
	addFiles: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: side_margins,
	},
	SubmitPost: {
		flex: 1,
		justifyContent: 'flex-end',
	}
});
