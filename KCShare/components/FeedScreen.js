import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';

class FeedHeader extends Component {
    render() {
	return (
	    <View style={styles.header}>
		<Text style={styles.headerText}>KCShare</Text>
	    </View>
	)
    }
}

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
	    <View style={styles.view}>
		<FeedHeader/>
		<SafeAreaView style={styles.container}>
		    <FlatList
			data={this.state.posts}
			renderItem={({ item }) => <Post content={item.content} />}
			keyExtractor={post => post.id}
		    />
		</SafeAreaView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    view: {
	flex: 1,
	backgroundColor: '#110d41'
    },
    container: {
	flex: 8,
    },
    header: {
	flex:1,
    },
    headerText: {
	fontSize: 30,
	fontWeight: 'bold',
	color: '#fcfcff',
	padding: 25,
    }
});
