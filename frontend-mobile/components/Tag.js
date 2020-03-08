import React, { Component } from 'react';
import { Text, StyleSheet, Linking } from "react-native"

export default class Tag extends Component {
	
	content = null;
	postCount = null;
	
    render() {
		if (this.props.tag) {
			this.content = this.props.tag.hashtag;
			this.postCount = this.props.tag.postCount;
	
			return (
				<Text onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.content}`)}
				style={styles.hashtagText}>
					#{this.content}
				</Text>
			)
		}
		else {
			return <></>
		}
    }
}

const styles = StyleSheet.create({
	hashtagText: {
		marginLeft: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: '#FB9B38',
		padding: 6
	}
});

