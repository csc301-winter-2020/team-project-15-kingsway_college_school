import React, { Component } from 'react';
import { Alert, RefreshControl, SafeAreaView, View, FlatList, StyleSheet, Text, Button } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { Auth } from 'aws-amplify';
const side_margins = 16
let screen = null;

// New Post Header for the page (unused)
class NewPostHeader extends Component {

	render() {
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>Profile</Text>
			</View>
		)
	}
}

class LogoutButton extends Component {
	constructor() {
		super();
		this.logoutAlert = this.logoutAlert.bind(this)
		this.logout = this.logout.bind(this)
	}
	logout() {
		console.log("logout")
		Auth.signOut().then(data => {
			console.log(data)
			this.props.authSetState("signIn")
		}).catch(data => {
			console.log(data)
		})
	}
	logoutAlert() {
		Alert.alert(
			'Logout?',
			'Are you sure you want logout?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => this.logout() },
			],
			{ cancelable: true },
		);
	}
	render() {
		return (
			<View style={styles.logoutButtonView}>
				<Button title="Logout" style={styles.logoutButton} onPress={() => this.logoutAlert()} />
			</View>
		)
	}
}

class HeaderButtons extends Component {

	render() {
		const buttons = ['My Posts', 'Favourites']

		return (
			<View style={styles.HeaderButtons}>
				<ButtonGroup
					onPress={this.props.updateIndex}
					selectedIndex={this.props.selectedIndex}
					buttons={buttons}
					containerStyle={{ height: 40, borderRadius: 20 }}
					selectedButtonStyle={{ backgroundColor: '#FD9E27' }}
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
		refreshing: true,
		userId: null
	}
	constructor() {
		super()
		this.updateIndex = this.updateIndex.bind(this)
		this.selectedScreen = this.selectedScreen.bind(this)
		this.refreshMyPosts = this.refreshMyPosts.bind(this)
		this.refreshFavourites = this.refreshFavourites.bind(this)
	}

	refreshMyPosts() {
		this.state.posts = [];
		let getMyPostsParams = { queryStringParameters: { searchType: 'OWN'} };
		// Get own posts from backend
		Amplify.API.get('getPosts', "", getMyPostsParams).then((response) => {
			this.setState({
				posts: response,
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
		})
	}

	refreshFavourites() {
		this.state.favourites = [];
		let getFavouritesParams = { queryStringParameters: { searchType: 'FAV' } };
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
		this.focusListener = this.props.navigation.addListener('focus', () => {
			console.log("Called the focus listener\n");
			this.refreshMyPosts();
			this.refreshFavourites();
			// (this.state.selectedIndex === 0) ? this.refreshMyPosts() : this.refreshFavourites();
		});

	    Auth.currentAuthenticatedUser().then(user => {
		console.log(user.attributes["custom:userID"])
		this.setState({userId: user.attributes["custom:userID"]})
	    })

		if (this.state.posts.length === 0) {
			this.refreshMyPosts();
		}
		if (this.state.favourites.length === 0) {
			this.refreshFavourites();
		}
	}

	updateIndex(selectedIndex) {
		this.setState({ selectedIndex })
		// console.log(this.state)
	}

	selectedScreen() {
		const index = this.state.selectedIndex;
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={index ? this.state.favourites : this.state.posts}
					renderItem={({ item }) => <Post navigation={this.props.navigation} post={item} refresh={() => {
							this.refreshFavourites();
							this.refreshMyPosts(); }
						} />
					}
					keyExtractor={post => post.postID}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={() => index ? this.refreshFavourites() : this.refreshMyPosts()}
							tintColor={"white"}
						/>
					}
				/>
			</SafeAreaView>
		)
	}

	render() {
		return (
			<View style={styles.view}>
				<View style={{ flexDirection: 'row', padding: 20 }}>
					<HeaderButtons updateIndex={this.updateIndex} selectedIndex={this.state.selectedIndex} />
					<LogoutButton navigation={this.props.navigation} authSetState={this.props.route.params.authSetState} />
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
		flex: 2,
		marginTop: side_margins / 2
	},
	headerText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#fcfcff',
		padding: 25,
	},
	HeaderButtons: {
		// marginHorizontal: side_margins/2,
		marginTop: side_margins / 2,
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
	},
	logoutButtonView: {
		flex: 1,
		marginTop: side_margins / 2,
		justifyContent: 'center',
		marginRight: side_margins,
		borderRadius: 50,
		backgroundColor: "#110d41"
	},
	logoutButton: {
		color: "red"
	},
	favourites: {
		justifyContent: "center",
		alignItems: "center"
	},
	container: {
		flex: 1
	},

});
