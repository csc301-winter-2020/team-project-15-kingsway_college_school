import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { TabActions } from '@react-navigation/native';

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
	render() {
		return (
			<View style={{flexDirection: "row",}}>
				<View style={styles.addFiles}>
					<Icon name="location-searching" color="#2A5AD5" raised={true} reverse={true}/>
					<Icon name="camera-alt" color="#2A5AD5" raised={true} reverse={true}/>
				</View>
				<View style={styles.SubmitPost}>
					<Icon name="check" color="#28B11D" raised={true} reverse={true}/>
				</View>
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
				placeholder={"Share what you've learnt!"}
				placeholderTextColor="#9E9E9E"
				borderBottomColor='#000000'
				numberOfLines={10}
				multiline={true}			
			/>
			<NewPostButtons/>
			
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
		color:'#FFFFFF',
		height: 200,
		borderRadius: 20 ,
		backgroundColor : "#292654",
		padding: 20,
		marginHorizontal: side_margins,
	},
	addFiles: {
		flex: 4,
		justifyContent: 'flex-start',
		marginHorizontal: side_margins,
	},
	SubmitPost: {
		flex: 1,
		justifyContent: 'flex-end',
	}
});