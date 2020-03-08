import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';

import Amplify from 'aws-amplify';
import Post from './Post.js';


const side_margins = 16
let screen = null;

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
		this.screen = (
			<SafeAreaView style={styles.container}>
				<FlatList
				data={this.state.posts}
				renderItem={({ item }) => <Post post={item} />}
				keyExtractor={post => post.postID}
				/>
			</SafeAreaView>
		)
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
			{this.screen}
			
			
		</View>
		)
	}
}

export default class ProfileScreen extends Component {
	state = {
		posts: []
		}
	
		componentDidMount() {
		if (this.state.posts.length === 0) {
			Amplify.API.get('getPosts', "").then( (response) => {
			this.setState({posts: response});
			console.log("Response: ")
			
			console.log(this.state.posts)
	
			}).catch((error) => {
			console.log(error)
			})
		}
		}
	
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