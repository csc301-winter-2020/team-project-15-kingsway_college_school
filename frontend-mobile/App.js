import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from './components/FeedScreen.js'
import NewPostScreen from './components/NewPostScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import Amplify from 'aws-amplify';


Amplify.configure({
    API: {
	endpoints: [
	    {
		name: 'getPosts',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPosts',
		service: 'api-gateway',
		region: 'us-east-1'
	    },
	    {
		name: 'getPopularHashtags',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPopularHashtags',
		service: 'api-gateway',
		region: 'us-east-1',
	    },
	    
	    {
		name: 'newPost',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/newPost',
		service: 'api-gateway',
		region: 'us-east-1'
	    },
	    {
		name: 'deletePost',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/deletePost',
		service: 'api-gateway',
		region: 'us-east-1'
	}]
    }
});

const Tab = createBottomTabNavigator();
const SIZE = 80;

function MyTabs(props) {
    return (
	<Tab.Navigator
	    initialRouteName="Feed"
	    tabBarOptions={{
		showLabel: false,
		style: styles.bar,
		keyboardHidesTabBar: true
	    }}
	>
	    <Tab.Screen
		name="Feed"
		component={FeedScreen}
		options={{
		    tabBarLabel: 'Home',
		    tabBarIcon: ({color, size }) => (
			<MaterialCommunityIcons name="home" color={color} size={size} />
		    ),
		}}
	    />
	    <Tab.Screen
	    name="New Post"
	    component={NewPostScreen}
	    options={{
		tabBarLabel: 'New Post',
		tabBarIcon: ({focused, color, size}) => (
		    <View style={{paddingBottom: 0}}> 
			<View style={{
			    alignItems: 'center',
			    justifyContent: 'center',
			    width: SIZE,
			    height: SIZE,
			    borderRadius: SIZE / 2,
			    backgroundColor: '#48A2F8',
			}}>
			    <Icon name="add" color='#48A2F8' reverse={true}/>
			</View>
		    </View>
		),
	    }}
	    />
	    <Tab.Screen
	    name="Profile"
	    component={ProfileScreen}
	    options={{
		tabBarLabel: 'Profile',
		tabBarIcon: ({ color, size }) => (
		    <MaterialCommunityIcons name="account" color={color} size={size}/>
		),
	    }}
	    />
	</Tab.Navigator>
    );
}

export default function App() {
    return (
	<View style={styles.view}>
	    <NavigationContainer style={styles.bar}>
		<MenuProvider>
		    <MyTabs />
		</MenuProvider>
	    </NavigationContainer>
	</View>
    );
}
const styles = StyleSheet.create({
    view: {
	flex: 1,
	backgroundColor: 'red'
    },
    bar: {
	backgroundColor: '#23275f',
	borderTopWidth: 0,
	//	backgroundColor: '#110d41',
    },
});
