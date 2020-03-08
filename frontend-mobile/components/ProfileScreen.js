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
	selectedIndex: 0
    }

    constructor () {
	super()
	this.updateIndex = this.updateIndex.bind(this)
	this.selectedScreen = this.selectedScreen.bind(this)
    }
    
    componentDidMount() {
	const userID = '2';
	let getParams = { queryStringParameters: { searchType: 'USER', searchParameter: userID } };

	if (this.state.posts.length === 0) {
	    Amplify.API.get('getPosts', "", getParams).then( (response) => {
		this.setState({posts: response});
		
	    }).catch((error) => {
		console.log(error)
	    })
	}
    }
    updateIndex(selectedIndex) {
	this.setState({selectedIndex})
	console.log(this.state)
    }

    selectedScreen() {
	if (this.state.selectedIndex == 0) {
	    return (
		<SafeAreaView style={styles.container}>
		    <FlatList
		    data={this.state.posts}
		    renderItem={({ item }) => <Post post={item} />}
		    keyExtractor={post => post.postID}
		    />
		</SafeAreaView>)
	}
	else {
	    return <Text>Hey</Text>
	}
    }
	 
    render() {
	return (
	    <View style={styles.view}>
		<View style={{flexDirection: 'row'}}>
		    <NewPostHeader/>
		    <HeaderButtons updateIndex={this.updateIndex} selectedIndex={this.state.selectedIndex} />
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
		//fontWeight: 'light',
		flexDirection: 'column',
		justifyContent: 'center',

	},
    container: {
	flex: 1
    }
});
