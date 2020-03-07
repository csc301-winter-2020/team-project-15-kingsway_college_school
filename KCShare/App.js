import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from './components/FeedScreen.js'
import NewPostScreen from './components/NewPostScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import Amplify from 'aws-amplify';

const Tab = createMaterialBottomTabNavigator();

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

function MyTabs(props) {
    let iconSize = 23;
    return (
	<Tab.Navigator
	    initialRouteName="New Post"
	    labelStyle={{ fontSize: 12 }}
	    barStyle={styles.bar}
	>
	    <Tab.Screen
	    name="Feed"
	    component={FeedScreen}
	    options={{
		tabBarLabel: 'Home',
		tabBarIcon: ({focused, color, size }) => (
		    <MaterialCommunityIcons name="home" color={color} size={iconSize} />
		),
            }}
	    />
	    <Tab.Screen
		name="New Post"
		component={NewPostScreen}
		options={{
		    tabBarLabel: 'New Post',
		    tabBarIcon: ({ color, size }) => (
			<MaterialCommunityIcons name="tooltip-plus-outline" color={color} size={iconSize} />
		    ),
		}}
	    />
	    <Tab.Screen
		name="Profile"
		component={ProfileScreen}
		options={{
		    tabBarLabel: 'Profile',
		    tabBarIcon: ({ color, size }) => (
			<MaterialCommunityIcons name="account" color={color} size={iconSize} />
		    ),
		}}
	    />
	</Tab.Navigator>
    );
}

export default function App() {
    return (
	<View style={styles.view}>
	    <NavigationContainer>
		<MyTabs />
	    </NavigationContainer>
	</View>
    );
}
const styles = StyleSheet.create({
    view: {
	flex: 1,
    },
    bar: {
	backgroundColor: '#23275f',
    },
});
