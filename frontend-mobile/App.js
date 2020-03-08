import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from './components/FeedScreen.js'
import NewPostScreen from './components/NewPostScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import Amplify from 'aws-amplify';


Amplify.configure({
    API: {
	endpoints: [{
	    name: 'getPosts',
	    endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPosts',
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
			    backgroundColor: focused? "#28B11D" : '#48A2F8',
			}}>

			<Icon name={focused? "check" : "add"} color={focused ? "#28B11D" : '#48A2F8'} reverse={true} onPress={focused? () => console.log("Submit !") : null}/>
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
		<MyTabs />
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

//	backgroundColor: '#110d41',
    },
});
