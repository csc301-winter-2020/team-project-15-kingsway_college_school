import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
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
	
	render () {
		const buttons = ['My Posts', 'Favourites']

		return (
		<View style={styles.HeaderButtons}>
			<ButtonGroup
				onPress={this.props.updateIndex}
				selectedIndex={this.props.selectedIndex}
				buttons={buttons}
				containerStyle={{height: 40, borderRadius: 20}}
				selectedButtonStyle={{backgroundColor: '#FD9E27'}}
			/>
			
			
		</View>
		)
	}
}

export default class ProfileScreen extends Component {

	state = {
		posts: [],
		favourites: [],
		selectedIndex: 0,
		refreshing: true
	}
	constructor() {
		super()
		this.updateIndex = this.updateIndex.bind(this)
		this.selectedScreen = this.selectedScreen.bind(this)
		this.refresh = this.refresh.bind(this)
	}

	refresh() {
		this.state.posts = [];
		this.state.favourites = [];

		const userID = '2';
		let getMyPostsParams = { queryStringParameters: { searchType: 'USER', searchParameter: userID } };
		let getFavouritesParams = { queryStringParameters: { searchType: 'FAV', searchParameter: userID } };

		// Get own posts from backend
		Amplify.API.get('getPosts', "", getMyPostsParams).then((response) => {
			this.setState({
				posts: response,
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
		})

		// Get favourites from backend
		Amplify.API.get('getPosts', "", getFavouritesParams).then((response) => {
			this.setState({
				favourites: response,
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
		})

	}
	componentDidMount() {
		if (this.state.posts.length === 0 || this.state.favourites.length === 0) {
			this.refresh()
		}
	}

	updateIndex(selectedIndex) {
		this.setState({ selectedIndex })
		console.log(this.state)
	}

	selectedScreen() {
		// Top tab selected is "My Posts"
		if (this.state.selectedIndex == 0) {
			return (
				<SafeAreaView style={styles.container}>
					<FlatList
						data={this.state.posts}
						renderItem={({ item }) => <Post post={item} refresh={() => this.refresh()} />}
						keyExtractor={post => post.postID}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => this.refresh()}
								tintColor={"white"}
							/>
						}
					/>
				</SafeAreaView>)
		}
		// Top tab selected is "Favourites"
		else {
			return (
				<SafeAreaView style={styles.container}>
					<FlatList
						data={this.state.favourites}
						renderItem={({ item }) => <Post post={item} refresh={() => this.refresh()} />}
						keyExtractor={post => post.postID}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => this.refresh()}
								tintColor={"white"}
							/>
						}
					/>
				</SafeAreaView>
			)
		}
	}

	render() {
		return (
			<View style={styles.view}>
				<View style={{ flexDirection: 'row', padding: 20 }}>
					<HeaderButtons updateIndex={this.updateIndex} selectedIndex={this.state.selectedIndex} />
					{/* <LogoutButton navigation={this.props.navigation} authSetState={this.props.route.params.authSetState} /> */}
				</View>
				{this.selectedScreen()}
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
		marginTop: side_margins/2
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	HeaderButtons: {
		// marginHorizontal: side_margins/2,
		marginTop: side_margins/2,
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
    container: {
	flex: 1
    },
    favorites: {
	justifyContent: "center",
	alignItems: "center"
    }
});
