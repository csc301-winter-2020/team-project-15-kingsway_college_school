import React, { Component } from 'react';
import { Alert, RefreshControl, SafeAreaView, View, FlatList, StyleSheet, Text, Button } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { Auth } from 'aws-amplify';


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
	    this.props.navigation.popToTop();
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
				<Button title="Logout" style={styles.logoutButton} color="white" onPress={() => this.logoutAlert() } />
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

		const userID = '2';
		let getParams = { queryStringParameters: { searchType: 'USER', searchParameter: userID } };

		Amplify.API.get('getPosts', "", getParams).then((response) => {
			this.setState({
				posts: response,
				refreshing: false
			});
		}).catch((error) => {
			console.log(error)
		})

	}
	componentDidMount() {
	    console.log("--------------------------")
	    console.log(this.props)
		if (this.state.posts.length === 0) {
			this.refresh()
		}
	}

	updateIndex(selectedIndex) {
		this.setState({ selectedIndex })
		console.log(this.state)
	}

	selectedScreen() {
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
		else {
			return (
				<View style={styles.favorites}>
					<Text style={{ color: "white", fontSize: 40 }}>Favorites</Text>
				</View>
			)
		}
	}

	render() {
		return (
			<View style={styles.view}>
				<View style={{ flexDirection: 'row' , padding: 20}}>
					<HeaderButtons updateIndex={this.updateIndex} selectedIndex={this.state.selectedIndex} />
					<LogoutButton navigation={this.props.navigation} />
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
		borderRadius: 50
	},
	logoutButton: {
	    color: "red"
	}
});
