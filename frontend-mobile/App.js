import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from './components/FeedScreen.js'
import NewPostScreen from './components/NewPostScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import LoginScreen from './components/LoginScreen.js'
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'; // or 'aws-amplify-react-native';

Amplify.configure({
    API: {
	endpoints: [
	    {
		name: 'getPosts',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPosts',
		service: 'api-gateway',
		region: 'us-east-1'
	    },
	    {
		name: 'getPopularHashtags',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPopularHashtags',
		service: 'api-gateway',
		region: 'us-east-1',
	    },
	    
	    {
		name: 'newPost',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/newPost',
		service: 'api-gateway',
		region: 'us-east-1'
	    },
	    {
		name: 'deletePost',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/deletePost',
		service: 'api-gateway',
		region: 'us-east-1'
	}]
    },
    Auth: {

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_mgyiyKSzT',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1lnuahrib0rj0c2gs84o9nsu1i',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'kcsshare.auth.us-east-1.amazoncognito.com',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'your_cognito_domain',
            scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
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
const Stack = createStackNavigator();

function App() {
    return (
	<View style={styles.view}>
	    <NavigationContainer style={styles.bar}>
		<MenuProvider>
		    <Stack.Navigator
			headerMode="none"
			screenOptions={{
			    gestureEnabled: false
			}}
		    >
			<Stack.Screen
			name="Login"
			component={LoginScreen}
			/>
			<Stack.Screen
			name="Tabs"
			component={MyTabs}
			/>
		    </Stack.Navigator>
		</MenuProvider>
	    </NavigationContainer>
	</View>
    );
}

export default withAuthenticator(App);

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
