import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import FeedScreen from './components/FeedScreen.js'
import ExploreScreen from './components/ExploreScreen.js'
import NewPostScreen from './components/NewPostScreen.js'
import ProfileScreen from './components/ProfileScreen.js'
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { TextInput } from 'react-native-paper';

console.disableYellowBox = true;

Amplify.configure({
	API: {
		endpoints: [
			{
				name: 'getPosts',
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPosts',
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
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/getPopularHashtags',
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
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/newPost',
				service: 'api-gateway',
				region: 'us-east-1',
				custom_header: async () => {
					//return { Authorization : 'token' } 
					// Alternatively, with Cognito User Pools use this:
					return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
				}
			},
			{
				name: 'favouritePost',
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/favouritePost',
				service: 'api-gateway',
				region: 'us-east-1',
				custom_header: async () => {
					//return { Authorization : 'token' } 
					// Alternatively, with Cognito User Pools use this:
					return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
				}
			},
			{
				name: 'unfavouritePost',
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/unfavouritePost',
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
				endpoint: 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/prod/deletePost',
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
		authenticationFlowType: 'USER_PASSWORD_AUTH',
		identityPoolId: 'us-east-1:b2f0fb38-17fc-43a6-98db-6c372e572f0e',

	},
	Storage: {
		AWSS3: {
			bucket: 'kcpostimages', //REQUIRED -  Amazon S3 bucket
			region: 'us-east-1', //OPTIONAL -  Amazon service region
			identityPoolId: 'us-east-1:b2f0fb38-17fc-43a6-98db-6c372e572f0e',
		}
	}
});

class Authentication extends Component {
	constructor() {
		super();
		this.signIn = this.signIn.bind(this);
		this.authSetState = this.authSetState.bind(this);
		this.state = {
			authState: 'loading',
			authData: null,
			authError: null,
			currUser: "",
			currPass: "",
			alertText: "",
		}
	}

	componentDidMount() {
		// check the current user when the App component is loaded
		Auth.currentAuthenticatedUser().then(user => {
			this.setState({ authState: 'signedIn' });
		}).catch(e => {
			console.log(e);
			this.setState({ authState: 'signIn' });
		});
	}
	authSetState(newState) {
		this.setState({ authState: newState, alertText: "" });
	}
	async signIn(username, password) {
		try {

			const user = await Auth.signIn(username, password);
			if (user.challengeName === 'SMS_MFA' ||
				user.challengeName === 'SOFTWARE_TOKEN_MFA') {
				// You need to get the code from the UI inputs
				// and then trigger the following function with a button click
				// const code = getCodeFromUserInput();
				// If MFA is enabled, sign-in should be confirmed with the confirmation code
				const loggedUser = await Auth.confirmSignIn(
					user,   // Return object from Auth.signIn()
					code,   // Confirmation code  
					mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
				);
			} else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
				// You need to get the new password and required attributes from the UI inputs
				// and then trigger the following function with a button click
				// For example, the email and phone_number are required attributes
				// const {username, email, phone_number} = getInfoFromUserInput();
				// password = "bing0Bang@@"
				const loggedUser = await Auth.completeNewPassword(
					user,              // the Cognito User Object
					password,       // the new password
					// OPTIONAL, the required attributes
					// {
					// 	email : email,
					// }
					//     phone_number,
					// } 
				);
			} else if (user.challengeName === 'MFA_SETUP') {
				// This happens when the MFA method is TOTP
				// The user needs to setup the TOTP before using it
				// More info please check the Enabling MFA part
				Auth.setupTOTP(user);
			} else {
				// The user directly signs in
				console.log('success');
				this.setState({ authState: 'signedIn' });
			}
		} catch (err) {
			console.log(err);
			this.setState({ alertText: err.message })
			if (err.code === 'UserNotConfirmedException') {
				// The error happens if the user didn't finish the confirmation step when signing up
				// In this case you need to resend the code and confirm the user
				// About how to resend the code and confirm the user, please check the signUp part
			} else if (err.code === 'PasswordResetRequiredException') {
				// The error happens when the password is reset in the Cognito console
				// In this case you need to call forgotPassword to reset the password
				// Please check the Forgot Password part.
			} else if (err.code === 'NotAuthorizedException') {
				// The error happens when the incorrect password is provided
			} else if (err.code === 'UserNotFoundException') {
				// The error happens when the supplied username/email does not exist in the Cognito user pool
			} else {
				console.log(err);


			}
		}
	}
	render() {

		if (this.state.authState === "signedIn") {
			return (
				<App authSetState={this.authSetState} />
			)
		}
		else {
			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

					<KeyboardAvoidingView style={styles.signIn} behavior="padding">

						<Image source={require("./assets/logo.png")} style={styles.signInImage} />
						<View style={styles.signInForm}>
							<Text style={styles.alertText}>{this.state.alertText}</Text>
							<TextInput style={styles.signInInput} onChangeText={(currUser) => this.setState({ currUser })} placeholder="Username" />
							<TextInput style={styles.signInInput} onChangeText={(currPass) => this.setState({ currPass })} placeholder="Password" secureTextEntry={true} />

							<View style={styles.signInButton}>
								<Button title="Sign In" onPress={() => this.signIn(this.state.currUser, this.state.currPass)} />
							</View>
						</View>
					</KeyboardAvoidingView >
				</TouchableWithoutFeedback>

			)
		}

	}
}


// You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
// let username = "devin"
// let password = "bing0Bang@@"
// let email = "asdf@gmail.com"

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
		    tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,3)}}></BottomTabBar>}
		>
			<Tab.Screen
				name="Feed"
				component={FeedScreen}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="New Post"
				component={NewPostScreen}
				options={{
					tabBarLabel: 'New Post',
					tabBarIcon: ({ focused, color, size }) => (
						<View style={{ paddingBottom: 0 }}>
							<View style={{
								alignItems: 'center',
								justifyContent: 'center',
								width: SIZE,
								height: SIZE,
								borderRadius: SIZE / 2,
								backgroundColor: '#48A2F8',
							}}>
								<Icon name="add" color='#48A2F8' reverse={true} />
							</View>
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				initialParams={{ authSetState: props.authSetState }}
				options={{
					tabBarLabel: 'Profile',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
			    name="Explore"
			    component={ExploreScreen}
			/>
			    
		</Tab.Navigator>
	);
}

function App(props) {
	return (
		<View style={styles.view}>
			<NavigationContainer style={styles.bar}>
				<MenuProvider>
					<MyTabs authSetState={props.authSetState} />
				</MenuProvider>
			</NavigationContainer>
		</View>
	);
}


export default Authentication;

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
	signIn: {
		flex: 1,
		backgroundColor: "#110d41",
		justifyContent: 'center',
	},
	signInForm: {
		flex: 2
	},
	signInInput: {
		marginHorizontal: 20,
		marginVertical: 10,
		borderRadius: 5
	},
	signInImage: {
		flex: 1,
		height: null,
		width: null,
		resizeMode: "contain",
		marginHorizontal: 50,
		marginTop: 20
	},
	signInButton: {
		marginHorizontal: 20,
		marginVertical: 10,
		borderRadius: 5,
	},
	alertText: {
		color: "red",
		fontSize: 15,
		justifyContent: 'center',
		alignContent: "center",
		alignItems: "center",
		textAlign: "center"
	}
});
