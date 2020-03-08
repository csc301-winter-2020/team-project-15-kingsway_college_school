import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';

const side_margins = 16

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

class HeaderButtons extends Component {
	constructor () {
		super()
		this.state = {
		  selectedIndex: 0
		}
		this.updateIndex = this.updateIndex.bind(this)
	  }
	  
	  updateIndex (selectedIndex) {
		this.setState({selectedIndex})
	  }
	  
	render () {
		const buttons = ['My Posts', 'Favourites']
		const { selectedIndex } = this.state
	  
		return (
		<View style={styles.HeaderButtons}>
			<ButtonGroup
				onPress={this.updateIndex}
				selectedIndex={selectedIndex}
				buttons={buttons}
				containerStyle={{height: 40, borderRadius: 20}}
				selectedButtonStyle={{backgroundColor: '#FD9E27', fontWeight: 900}}
			/>
		</View>
		)
	}
}

export default class ProfileScreen extends Component {
  render() {
      return (
	  <View style={styles.view}>
		  <View style={{flexDirection: 'row'}}>
				<NewPostHeader/>
				<HeaderButtons/>
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
		flex:2,
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	HeaderButtons: {
		marginHorizontal: side_margins/2,
		flex: 3,
		fontWeight: 'light',
		flexDirection: 'column',
		justifyContent: 'center',

	}
});