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
        <View style={{flex: 1}}>
          <SearchBar autoFocus 
            containerStyle={styles.exploreBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.exploreBarInputContainer}
          />
        </View>
        
      </View>
    )
  }
}

export default class ExploreScreen extends Component {
  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.view}>
        <ExploreHeader navigation={this.props.navigation} />
        <Text style={styles.headerText}>Top Tags</Text>
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
  exploreBarContainer: {
    flex: 1,
    backgroundColor: "#110d41",
    paddingTop: 25,
    paddingBottom: 10
  },
  exploreBarInputContainer: {
    backgroundColor: '#292753',
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10
  },
  searchBarInput: {
    fontWeight: "normal",
    color: "#000000",
  }
});
