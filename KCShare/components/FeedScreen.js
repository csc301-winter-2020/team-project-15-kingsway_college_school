import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';

let DATA = [] 

Amplify.API.get('getPosts', "").then( (response) => {
    DATA.push.apply(DATA, response);
    console.log(DATA)

}).catch((error) => {
    console.log(error)
})

function Post({ content }) {
  return (
    <View style={styles.post}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

export default class FeedScreen extends Component {
  render() {
      return (
	  <SafeAreaView style={styles.container}>
	      <FlatList
		  data={DATA}
		  renderItem={({ item }) => <Post content={item.content} />}
		  keyExtractor={post => post.id}
	      />
	  </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    backgroundColor: '#23275f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    fontSize: 32,
    color: '#fcfcff',
  },
});
