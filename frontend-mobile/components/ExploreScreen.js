import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Amplify from 'aws-amplify';
import { SearchBar } from 'react-native-elements';
import Tag from './Tag.js';

// Delete these imports if unused
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';


class ExploreHeader extends Component {
  state = {
    text: ''
  };
  
  searching (text) {
    this.setState(text);
    // doSomeDelay();
    // startSearching();
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.exploreBarContainer}>
          <SearchBar
            autoFocus
            value={this.state.text}
            containerStyle={styles.exploreBarContainer}
            inputStyle={styles.exploreBarInput}
            inputContainerStyle={styles.exploreBarInputContainer}
            onChangeText={(text) => this.searching({text})}
          />
        </View>

        <View>
		      <Text style={styles.headerText}>Top Tags</Text>
		    </View>
      </View>
    )
  }
}

export default class ExploreScreen extends Component {
  state = {
    hashtags: [],
  };
  
  componentDidMount() {
    if (this.state.hashtags.length === 0) {
	    Amplify.API.get('getPopularHashtags', "").then( (response) => {
        // Hashtags arrive in descending order of postCount (most popular first)
        this.setState({hashtags: response});
	    }).catch((error) => {
		    console.log(error)
	    });
	  }
  }

  render() {
    return (
      <View style={styles.view}>
        <ExploreHeader  />

        <SafeAreaView style={styles.hashtagsContainer}>
          <FlatList
            data={this.state.hashtags}
            renderItem={({ item }) => <Tag tag={item} />}
          />
		    </SafeAreaView>
        <Tag />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#110d41"
  },
  container: {
    flex: 8
  },
  exploreBarContainer: {
    flexDirection: 'column',
    backgroundColor: "#110d41",
    paddingTop: 20,
    paddingBottom: 10
  },
  exploreBarInputContainer: {
    padding: 5,
    backgroundColor: '#292753',
    borderRadius: 50,
  },
  exploreBarInput: {
    fontWeight: "normal",
    color: '#FFFFFF',
    flex: 1,
    height: 20,
    fontSize: 18
  },
  header: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "column"
  },
  headerText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fcfcff"
  },
  hashtagsContainer: {
    flexDirection: "column"
  },
  hashtagText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: '#FB9B38',
    padding: 6
  }
});
