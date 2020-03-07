import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native"

export default class Post extends Component {
    locationHeader = null;
    render() {
	console.log("Post props:")
	console.log(this.props)
	if (this.props.post.location) {
	    this.locationHeader = (
		<View style={styles.location}>
		    <Text style={styles.locationText}>@{this.props.post.location}</Text>
		</View>
	    )
	}
	return (
	    <View style={styles.post}>
		{this.locationHeader}
		<View styles={{flex:1}}>
		    <Text style={styles.content}>{this.props.post.content}</Text>
		</View>
	    </View>
	)
    }
}

const styles = StyleSheet.create({
    post: {
	backgroundColor: '#23275f',
	padding: 15,
	marginVertical: 8,
	marginHorizontal: 16,
	borderRadius: 10,
	flex: 1
    },
    content: {
	fontSize: 15,
	color: '#fcfcff',
    },
    location: {
	flex: 1,
	paddingBottom: 5
    },
    locationText: {
	fontSize: 15,
	color: '#fcfcff',
	fontWeight: 'bold',
	fontStyle: 'italic'
    }
});

