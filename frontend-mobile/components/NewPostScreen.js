import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';

const side_margins = 16

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
class AddAttachments extends Component {
	render() {
		return (
			<View style={styles.addFiles}>
				<Icon name="camera" color="#2A5AD5" raised={true} reverse="true" size={32}/>
			</View>
		)
	}
}

class AddLocation extends Component {
	render() {
		return (
			<View style={styles.addLocation}>
				<Icon name="location"/>
			</View>
		)
	}
}

export default class NewPostScreen extends Component {
  render() {
      return (
	  <View style={styles.view}>
		  <NewPostHeader/>
			<View style={{flex:8}}>
				<TextInput
				style={styles.TextInputStyleClass}
				underlineColorAndroid="transparent"
				placeholder={"Type Something in Text Area."}
				placeholderTextColor={"#9E9E9E"}
				numberOfLines={10}
				multiline={true}			
			/>
			<AddAttachments/>
			<AddLocation/>
			</View>
			
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
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	TextInputStyleClass: { 
		textAlign: 'left',
		height: 200,
		borderRadius: 20 ,
		backgroundColor : "#292654",
		padding: 20,
		marginHorizontal: side_margins,
	},
	addFiles: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginHorizontal: side_margins,
	},
	addLocation: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginHorizontal: side_margins,
	}
});