import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Amplify from 'aws-amplify';
import { SearchBar } from 'react-native-elements';
import Tag from './Tag.js';
import Post from './Post.js';


class ExploreTags extends Component {
  render() {
	  return (
	    <View>
        <View>
            <Text style={styles.headerText}>Top Tags</Text>
        </View>
	      <SafeAreaView style={styles.hashtagsContainer}>
	      <FlatList
              data={this.props.hashtags}
              renderItem={({ item }) => <Tag tag={item} search={(searchTerm) => this.props.search(searchTerm) } />}
		    />
		    </SafeAreaView>
	    </View>
	)

    }
}

class ExploreSearch extends Component {
  state = {
    text: '',
  };

    componentDidUpdate(prevProps) {
	console.log("Updating!")
	console.log(this.props.searchParam, prevProps.searchParam)
	if (this.props.searchParam != this.state.text) {
	    if (this.props.searchParam.length == 0) {
		this.setFlag()
	    } else {
		let text = this.props.searchParam;
		this.searching({text})
	    }
	}
    }
  
  searching (text) {
    this.setState(text);
    if (text.text) {
      // doSomeDelay();
      this.props.search(text.text);
    }
    else {
      this.props.setFlag();
    }
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

     </View>
    )
  }
}

class ExploreSearchResults extends Component {
  posts = [];
  
  constructor() {
    super();
  }

  render() {
    this.posts = this.props.posts;
	  return (
	    <SafeAreaView style={styles.container}>
		  <FlatList
		    data={this.posts}
		    renderItem={({ item }) => <Post post={item} refresh={() => this.refresh()} navigation={this.props.navigation} />}
		    // refreshControl={
        // <RefreshControl
        // colors={["#fcfcff"]}
        //       refreshing={this.state.refreshing }
        //       onRefresh={() => this.refresh() }
        //       tintColor={"white"}
        // />
		    // }
		    keyExtractor={post => post.postID}
		  />
		  </SafeAreaView>
	  )
  }
}

export default class ExploreScreen extends Component {
  state = {
    hashtags: [],
    showSearch: false,
    posts: []
  };

  constructor() {
    super();
    this.search = this.search.bind(this);
    this.setShowSearchFalse.bind(this);
  }

  setShowSearchFalse () {
    this.setState({showSearch: false});
  }
  
  search(searchTerm) {
    this.setState({showSearch: true});
    let getParams = { queryStringParameters: { searchType: 'TAG', searchParameter: searchTerm } };

    Amplify.API.get('getPosts', "", getParams).then( (response) => {
        this.setState({posts: response});
    }).catch((error) => {
        console.log(error)
    })
  }
  
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
    let currentView = <ExploreTags hashtags={this.state.hashtags} search={(searchTerm) => this.search(searchTerm)}/>
    if (this.state.showSearch) {
	    currentView = <ExploreSearchResults posts={this.state.posts} navigation={this.props.navigation} />
    }
    return (
      <View style={styles.view}>
	      <ExploreSearch search={this.search} setFlag={() => this.setShowSearchFalse() } searchParam={this.props.route.params ? this.props.route.params.searchParam : null} />
	      {currentView}
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
    paddingBottom: 10,
    borderBottomWidth: 0
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
