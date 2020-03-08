import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

class MenuIcon extends Component {
    render() {
	return <MaterialCommunityIcons name="dots-horizontal" color={"white"} size={20}/>
    }
}
class PostMenu extends Component {
    render() {
	const userID = 2;
	const menuOptionStyle = {
	    optionWrapper: {
		backgroundColor: "#fcfcff",
		borderRadius: 10
	    },
	    optionText: {
		fontSize: 15
	    },
	    optionsWrapper: {
		borderRadius: 10,
	    }
	}
	return (
	    <View style={{borderRadius: 10}}>
		<Menu>
		    <MenuTrigger children={<MenuIcon/>} />
		    <MenuOptions customStyles={menuOptionStyle}>
			<MenuOption onSelect={() => alert(`Save`)} text='Favourite' customStyles={menuOptionStyle} />
			<MenuOption onSelect={() => alert(`Delete`)} disabled={!this.props.userID == userID  } text='Delete' customStyles={menuOptionStyle}/>
		    </MenuOptions>
		</Menu>
	    </View>
	)
    }
}
export default class Post extends Component {
    locationHeader = null;
    dateHeader = null;
    image = null;
    render() {
	const month = {
	    0: 'January',
	    1: 'February',
	    2: 'March',
	    3: 'April',
	    4: 'May',
	    5: 'June',
	    6: 'July',
	    7: 'August',
	    8: 'September',
	    9: 'October',
	    10: 'November',
	    11: 'December'
	}
	if (this.props.post.location.name) {
	    this.locationHeader = (
		<Text style={styles.locationText}>@{this.props.post.location.name}</Text>
	    )
	}
	if (this.props.post.images.length > 0) {
	    console.log(this.props.post)
	    this.image = (
		<View style={{alignItems: 'center', paddingTop: 20}}>
		    <Image
			style={{width: 300, height: 100}}
			source={{uri: this.props.post.images[0]}}
		    />
		</View>
	    )
	}
	let time = new Date(0)
	time.setUTCSeconds(this.props.post.timeUploaded)
	return (
	    <View style={styles.post}>
		<View style={styles.header}>
		    <View style={styles.headerLeft}>
			{this.locationHeader}
			<Text style={styles.date}>{'' + month[time.getMonth()] + ' ' + (time.getDay() + 1) + ', ' + time.getFullYear() }</Text>
		    </View>
		    <View styles={styles.headerRight}>
			<PostMenu userID={this.props.post.userID} />
		    </View>
		</View>
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
    header: {
	flex: 1,
	paddingBottom: 5,
	flexDirection: "row",
	justifyContent: "space-between"
    },
    headerLeft: {
	flexDirection: "row",
    },
    headerRight: {

    },
    locationText: {
	fontSize: 15,
	color: '#fcfcff',
	fontWeight: 'bold',
	fontStyle: 'italic',
	paddingRight: 10
    },
    date: {
	fontSize: 15,
	color: 'lightgrey',
    },
    menuOption: {
	backgroundColor: "red"
    }
});

