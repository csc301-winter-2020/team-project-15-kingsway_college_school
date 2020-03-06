import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';

class NewPostHeader extends Component {
	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>New Post</Text>
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
	TextInputStyleClass:{ 
		textAlign: 'left',
		height: 200,
		borderRadius: 20 ,
		backgroundColor : "#292654",
		padding: 20,
		marginHorizontal: 16,
	}
});