import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

class ExploreHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.exploreBarContainer}>
          <SearchBar autoFocus 
            containerStyle={styles.exploreBarContainer}
            inputStyle={styles.exploreBarInput}
            inputContainerStyle={styles.exploreBarInputContainer}
          />
        </View>

        {/* <View style={{flex: 1}}>
		      <Text style={styles.headerText}>KCShare</Text>
		    </View> */}
      </View>
    )
  }
}

export default class ExploreScreen extends Component {
  state = {
    hashtags: [],
    placeholder: [
      '#MARSCentre',
      '#UofT',
      '#Ryerson',
      '#Autocad',
      '#Timmy'
    ]
  }
  
  componentDidMount() {
    if (this.state.hashtags.length === 0) {
	    Amplify.API.get('getPopularHashtags', "").then( (response) => {
		    this.setState({hashtags: response});
	    }).catch((error) => {
		    console.log(error)
	    })
	  }
  }

  render() {
    return (
      <View style={styles.view}>
        <ExploreHeader navigation={this.props.navigation} />

        <SafeAreaView style={styles.hashtagsContainer}>
          <FlatList
            data={this.state.hashtags}
            renderItem={({ item }) => <Text style={styles.hashtagText}>#{item.hashtag}</Text>}
            keyExtractor={hashtag => hashtag.postCount}
          />
		    </SafeAreaView>
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
    flex: 1,
    backgroundColor: "#110d41",
    paddingTop: 25,
    paddingBottom: 10
  },
  exploreBarInputContainer: {
    padding: 20,
    backgroundColor: '#292753',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  exploreBarInput: {
    fontWeight: "normal",
    color: '#FFFFFF',
    padding: 50
  },
  header: {
    flex: 1,
    flexDirection: "row"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fcfcff",
    padding: 25
  },
  hashtagsContainer: {
    flex: 8,
    marginLeft: 20
  },
  hashtagText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#FB9B38',
    padding: 6
  }
});
