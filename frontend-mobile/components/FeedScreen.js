import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen.js'

// Global Variables
const side_margins = 16

class FeedHeader extends Component {
    render() {
	return (
	    <View style={styles.header}>
		<View style={{flex: 1}}>
		    <Text style={styles.headerText}>KCShare</Text>
		</View>
		<View style={{flex: 1}}>
		    <SearchBar
		    containerStyle={styles.searchBarContainer}
		    inputStyle={styles.searchBarInput}
		    inputContainerStyle={styles.searchBarInputContainer}
		    placeholder={"Search..."}
		    onFocus={() => this.props.navigation.push("Explore")}
		    />
		</View>
	    </View>
	)
    }
}

class Feed extends Component {
    constructor() {
	super();
	this.refresh = this.refresh.bind(this)
    }
    state = {
	posts: [],
	refreshing: true
    }

    refresh() {
	this.state.posts = [];

	Amplify.API.get('getPosts', "").then( (response) => {
	    this.setState({
		posts: response,
		refreshing: false
	    });
	}).catch((error) => {
	    console.log(error)
	})

    }
    componentDidMount() {
	if (this.state.posts.length === 0) {
	    this.refresh()
	    
	}
    }
    render() {
	return (
	    <View style={styles.view}>
		<FeedHeader navigation={this.props.navigation} />
		<SafeAreaView style={styles.container}>
		    <FlatList
		    data={this.state.posts}
		    renderItem={({ item }) => <Post post={item} refresh={() => this.refresh()} />}
		    refreshControl={
			<RefreshControl
			       refreshing={this.state.refreshing }
			       onRefresh={() => this.refresh() }
			       tintColor={"white"}
			/>
		    }
		    keyExtractor={post => post.postID}
		    />
		</SafeAreaView>
	    </View>
	)
    }
}
const Stack = createStackNavigator();

export default class FeedScreen extends Component {
    

    render() {
	
	return (
	    <Stack.Navigator headerMode={"none"}>
		<Stack.Screen name="Feed" component={Feed} />
		<Stack.Screen name="Explore" component={ExploreScreen} />
	    </Stack.Navigator>
	    
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
	flexDirection: 'row',
	marginTop: side_margins/2,
    },
    headerText: {
	fontSize: 30,
	fontWeight: 'bold',
	color: '#fcfcff',
	padding: 25,
    },
    searchBarContainer: {
	flex: 1,
	backgroundColor:'#110d41',
	paddingTop: 25,
	paddingBottom: 10,
	borderBottomWidth: 0,
	borderTopWidth: 0
    },
    searchBarInputContainer: {
	backgroundColor: '#110d41',
    },
    searchBarInput: {
    }
});
