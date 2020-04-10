import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Amplify from 'aws-amplify';
import { SearchBar } from 'react-native-elements';
import Tag from './Tag.js';
import Post from './Post.js';

class SearchStatus extends Component {
  state = {status: 'Searching'}

  componentDidMount() {
    setInterval(() => {
      if (this.state.status.length > 17) {
        this.state.status = 'Searching';
      } else {
        this.setState({status: this.state.status + ' .'});
      }
    }, 50);
  }

  render() {
    return (
      <Text style={styles.searchingText}>{this.state.status}</Text>
    )
  }
}

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

  constructor() {
    super();
    this.searchTimer;
  }

  searchBarRef = null;

  componentDidMount() {
    if (this.props.searchParam != this.state.text) {
      if (this.props.searchParam.length == 0) {
        this.setState({text})
        this.props.setFlag()
      } 
      else {
      let text = this.props.searchParam;
      this.searching({text})
      }
    }
  }
  
  startSearchTimeout() {
    this.searchTimer = setTimeout(() => {
      this.props.search(this.state.text.replace(/\s/g, ""))
    }, 700); // Modify search timer/timeout to taste
  }
  
  stopSearchTimeout() {
    clearTimeout( this.searchTimer );
  }

  searching (text) {
    this.setState(text);
    this.stopSearchTimeout();
    if (text.text) {
      this.startSearchTimeout();
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
            // maxLength={25}
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
    posts: [],
    searchLoading: false,
    searchString: '',
    noResults: false
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
    this.setState({searchLoading: true, showSearch: true, searchString: ''});
    let getParams = { queryStringParameters: { searchType: 'TAG', searchParameter: searchTerm } };

    Amplify.API.get('getPosts', "", getParams).then( (response) => {
      this.setState({posts: response, searchLoading: false});
      if (response.length === 0) {
        this.setState({searchString: searchTerm, noResults: true});
      }
      else {
        this.setState({noResults: false});
      }
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
    let currentView = <ExploreTags hashtags={this.state.hashtags} search={(searchTerm) => this.search(searchTerm)} />

    // Handling search results or lack thereof.
    if (this.state.showSearch) {
      if (this.state.searchLoading) {
        currentView = <View><SearchStatus/></View> // Using animated view. Non-animated: <Text style={styles.searchingText}>Searching...</Text></View>
      }
      else if (this.state.noResults && !this.state.searchLoading) {
        currentView = <View>
          <Text style={styles.noResultsText}>No results for <Text style={styles.searchTermText}>#{this.state.searchString.toLowerCase()}</Text>{'\n'}</Text>
        </View>
      }
      else {
        currentView = <ExploreSearchResults posts={this.state.posts} navigation={this.props.navigation} />
      }
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
  searchingText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "normal",
    color: "lightgrey"
  },
  noResultsText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fcfcff"
  },
  searchTermText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "normal",
    color: "#FB9B38"
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
