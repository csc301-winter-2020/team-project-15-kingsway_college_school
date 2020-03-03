import React, { Component } from 'react';
import { Text, View, StyleSheet } from "react-native"

export default class Post extends Component {
    render() {
	return (
	    <View style={styles.post}>
		<Text style={styles.content}>{this.props.content}</Text>
	    </View>
	)
    }
}

const styles = StyleSheet.create({
    post: {
	backgroundColor: '#23275f',
	padding: 20,
	marginVertical: 8,
	marginHorizontal: 16,
	borderRadius: 10
    },
    content: {
	fontSize: 15,
	color: '#fcfcff',
    },
});

