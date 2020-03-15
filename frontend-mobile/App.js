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
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'; // or 'aws-amplify-react-native';

Amplify.configure({
    API: {
	endpoints: [
	    {
		name: 'getPosts',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPosts',
		service: 'api-gateway',
		region: 'us-east-1',
		custom_header: async () => { 
		    //return { Authorization : 'token' } 
		    // Alternatively, with Cognito User Pools use this:
		    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
		}
	    },
	    {
		name: 'getPopularHashtags',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/getPopularHashtags',
		service: 'api-gateway',
		region: 'us-east-1',
		custom_header: async () => { 
		    //return { Authorization : 'token' } 
		    // Alternatively, with Cognito User Pools use this:
		    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
		}
	    },
	    
	    {
		name: 'newPost',
		endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/dev/newPost',
		service: 'api-gateway',
		region: 'us-east-1',
		custom_header: async () => { 
		    //return { Authorization : 'token' } 
		    // Alternatively, with Cognito User Pools use this:
		    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
		}
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
        userPoolId: 'us-east-1_jXw5z0sO3',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '11r43dtvj0bnu97a20je2g97cf',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: 'kcsshare.auth.us-east-1.amazoncognito.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: 'your_cognito_domain',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: 'http://localhost:3000/',
        //     redirectSignOut: 'http://localhost:3000/',
        //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        // }
    }
});

/* let username = "devin"
 * let password = "bing0Bang@@"
 * let email = "asdf@gmail.com"
 * 
 * async function SignIn() {
 *     try {
 * 	console.log('oh man god damn')
 * 	const user = await Auth.signIn(username, password);
 * 	console.log('wow')
 *         if (user.challengeName === 'SMS_MFA' ||
 *             user.challengeName === 'SOFTWARE_TOKEN_MFA') {
 *             // You need to get the code from the UI inputs
 *             // and then trigger the following function with a button click
 *             // const code = getCodeFromUserInput();
 *             // If MFA is enabled, sign-in should be confirmed with the confirmation code
 *             const loggedUser = await Auth.confirmSignIn( 
 *                 user,   // Return object from Auth.signIn()
 *                 code,   // Confirmation code  
 *                 mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
 *             );
 *         } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
 *             const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
 *             // You need to get the new password and required attributes from the UI inputs
 *             // and then trigger the following function with a button click
 *             // For example, the email and phone_number are required attributes
 * 	    // const {username, email, phone_number} = getInfoFromUserInput();
 * 	    console.log('in new pass req');
 * 	    // password = "bing0Bang@@"
 *             const loggedUser = await Auth.completeNewPassword(
 *                 user,              // the Cognito User Object
 *                 password,       // the new password
 *                 // OPTIONAL, the required attributes
 *                 // {
 * 		// 	email : email,
 * 		// }
 *                 //     phone_number,
 *                 // } 
 * 	    );
 *         } else if (user.challengeName === 'MFA_SETUP') {
 *             // This happens when the MFA method is TOTP
 *             // The user needs to setup the TOTP before using it
 *             // More info please check the Enabling MFA part
 *             Auth.setupTOTP(user);
 *         } else {
 *             // The user directly signs in
 * 	    console.log(user);
 * 	    console.log('success')
 *         }
 *     } catch (err) { 
 * 	console.log(err);
 * 	console.log('that was error');
 *         if (err.code === 'UserNotConfirmedException') {
 *             // The error happens if the user didn't finish the confirmation step when signing up
 *             // In this case you need to resend the code and confirm the user
 *             // About how to resend the code and confirm the user, please check the signUp part
 *         } else if (err.code === 'PasswordResetRequiredException') {
 *             // The error happens when the password is reset in the Cognito console
 *             // In this case you need to call forgotPassword to reset the password
 *             // Please check the Forgot Password part.
 *         } else if (err.code === 'NotAuthorizedException') {
 *             // The error happens when the incorrect password is provided
 *         } else if (err.code === 'UserNotFoundException') {
 *             // The error happens when the supplied username/email does not exist in the Cognito user pool
 *         } else {
 *             console.log(err);
 *         }
 *     }
 * } */
// For advanced usage
//SignIn();
// You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
// Auth.signIn({
//     username, // Required, the username
//     password, // Optional, the password
//     // validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
// }).then(user => {console.log(user); console.log('auth we got em boys'); console.log(Auth.currentUserPoolUser())})
// .catch(err => {console.log(err); console.log('failed')});
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
