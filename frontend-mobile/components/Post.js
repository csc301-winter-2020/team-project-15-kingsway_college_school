import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from "react-native"

export default class Post extends Component {
    locationHeader = null;
    image = null;
    render() {
	if (this.props.post.location) {
	    this.locationHeader = (
		<View style={styles.location}>
		    <Text style={styles.locationText}>@{this.props.post.location}</Text>
		</View>
	    )
	}
	if (this.props.post.images) {
	    this.image = (
		<View style={{justifyContent: 'center'}}>
		<Image
		    style={{width: 300, height: 100}}
		    source={{uri: this.props.post.images[0]}}
		/>
		</View>
	    )
	}
	return (
	    <View style={styles.post}>
		{this.locationHeader}
		<View styles={{flex:1}}>
		    <Text style={styles.content}>{this.props.post.content}</Text>
		</View>
		{this.image}
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

