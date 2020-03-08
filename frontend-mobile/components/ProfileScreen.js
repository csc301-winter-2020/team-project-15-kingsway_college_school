import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';


// New Post Header for the page
class NewPostHeader extends Component {
	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>Profile</Text>
			</View>
		)
	}
}

export default class ProfileScreen extends Component {
  render() {
      return (
	  <View style={styles.view}>
	    	<NewPostHeader/>
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
});