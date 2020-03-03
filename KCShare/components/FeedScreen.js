import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js'

 export default class FeedScreen extends Component {
     state = {
	 posts: []
     }

     componentDidMount() {
	 if (this.state.posts.length === 0) {
	     Amplify.API.get('getPosts', "").then( (response) => {
		 this.setState({posts: response});
		 console.log(this.state.posts[0])
	     }).catch((error) => {
		 console.log(error)
	     })
	 }
     }

     render() {
	 
		 return (
	     <SafeAreaView style={styles.container}>
	       <FlatList
		 data={this.state.posts}
		 renderItem={({ item }) => <Post content={item.content} />}
		 keyExtractor={post => post.id}
		 />
	     </SafeAreaView>
	 );
     }
 }

const styles = StyleSheet.create({
    container: {
	flex: 1,
	backgroundColor: '#110d41'
    },
});
