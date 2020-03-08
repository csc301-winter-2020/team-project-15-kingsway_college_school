import { Text, View } from 'react-native';
import React, { Component } from 'react';

export default class ProfileScreen extends Component {
  render() {
      return (
	  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	      <Text>Profile</Text>
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