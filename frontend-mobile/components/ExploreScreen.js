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
        <View>
            <Text style={styles.headerText}>Top Tags</Text>
        </View>
        <View style={{flex: 1}}>
          <SearchBar autoFocus 
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInputContainer}
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
  searchBarContainer: {
    flex: 1,
    backgroundColor: "#110d41",
    paddingTop: 25,
    paddingBottom: 10
  },
  searchBarInputContainer: {
    backgroundColor: "#110d41"
  },
  searchBarInput: {}
});
