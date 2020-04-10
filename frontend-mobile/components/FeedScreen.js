import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Amplify, { Auth } from 'aws-amplify';
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
				<View style={{ flex: 1 }}>
					<Text style={styles.headerText}>KCShare</Text>
				</View>
				<View style={{ flex: 1 }}>
					<SearchBar
						containerStyle={styles.searchBarContainer}
						inputStyle={styles.searchBarInput}
						inputContainerStyle={styles.searchBarInputContainer}
						placeholder={"Search"}
						onFocus={() => this.props.navigation.push("Explore", { searchParam: "" })}
						platform={"ios"}
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
		this.extendPosts = this.extendPosts.bind(this)
	}
	state = {
		posts: [],
		refreshing: true,
		userID: null
	}

	refresh() {
		this.setState({ refreshing: true })

		Amplify.API.get('getPosts', "", {}).then((response) => {
			this.setState({
				posts: response,
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
			console.log(error.response)
		})

	}
	componentDidMount() {

		if (this.state.posts.length === 0) {
			this.refresh()
		}
		Auth.currentAuthenticatedUser().then(user => {
			this.setState({ userID: user.attributes["custom:userID"] })
		})

	}

	extendPosts(info) {
		console.log("Extending Posts")
		Amplify.API.get('getPosts', "", { queryStringParameters: { startID: this.state.posts[this.state.posts.length - 1].postID } }).then((response) => {
			console.log("Successful call to getPosts in extend")
			this.setState({
				posts: [...this.state.posts, ...response],
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
			console.log(error.response)
		})

	}

	render() {
		return (
			<View style={styles.view}>
				<FeedHeader navigation={this.props.navigation} />
				<SafeAreaView style={styles.container}>
					<FlatList
						data={this.state.posts}
						renderItem={({ item }) => <Post post={item} deletable={this.state.userID == item.userID} refresh={() => this.refresh()} navigation={this.props.navigation} />}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => this.refresh()}
								tintColor={"white"}
							/>
						}
						keyExtractor={post => post.postID}
						onEndReached={info => this.extendPosts(info)}
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
			<Stack.Navigator headerMode={"none"} gestureEnables={true}>
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
		flex: 1,
		flexDirection: 'row',
		marginTop: side_margins / 2,
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	searchBarContainer: {
		flex: 1,
		backgroundColor: '#110d41',
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
