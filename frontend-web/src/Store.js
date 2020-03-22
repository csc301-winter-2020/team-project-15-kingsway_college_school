import { decorate, observable, action, configure } from "mobx"
import React from "react"
import { Auth } from 'aws-amplify';

class Store extends React.Component {
	apiEndpoint = 'https://720phsp0e7.execute-api.us-east-1.amazonaws.com/test'

	currentView = 'Home'

	user = null
	session = null 
	userID = null
	
	search = (searchTerm) => {
		console.error('[SEARCH NOT DEFINED]')
	}

	changeTab = () => {
		console.error('[CHANGE TAB NOT DEFINED]')
	}

	setCurrentView = (tab) => {
		this.currentView = tab
		this.refreshCurrentView(tab)
	}

	refreshCurrentView = () => {
		console.error('[REFRESH CURRENT VIEW NOT DEFINED]')
	}

	updateFeedCallback = []

	updateFeeds = () => {
		this.updateFeedCallback.forEach((f) => { f() });
	}

	SignIn = async (username, password) => {
		try {
			const user = await Auth.signIn(username, password);
			if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
				const {requiredAttributes} = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
				const loggedUser = await Auth.completeNewPassword(
					user,              // the Cognito User Object
					password,       // the new password
					// OPTIONAL, the required attributes
				);
			} else {
				// The user directly signs in
				this.user = user
				Auth.userAttributes(user).then( (attributes) => {
					// If we ever add more attributes this indice may need to be changed
					this.userID = attributes[3].Value
				})
				this.session = user.signInUserSession
			}

			return true
		} catch (err) { 
			console.log(err);
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

			return false
		}
	}
}

decorate(Store, {
	currentView: observable,
	updateFeedCallback: observable,
	user: observable,
	session: observable,
	userID: observable,
	updateFeeds: action,
	setCurrentView: action,
	changeTab: action,
	refreshCurrentView: action,
	search: action,
	signIn: action
})

// You can remove this if you want to be able to directly change values rather than doing it through a setter function
configure({enforceActions: "observed"})
const globalStore = observable(new Store())
export default globalStore;