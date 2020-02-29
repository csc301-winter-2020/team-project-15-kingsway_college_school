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
