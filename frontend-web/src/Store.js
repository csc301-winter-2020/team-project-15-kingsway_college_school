import { decorate, observable, action, configure } from "mobx"
import React from "react"

class Store extends React.Component {

	currentView = 'Home'

	search = (searchTerm) => {
		console.error('[SEARCH NOT DEFINED]')
	}

	setCurrentView = (tab) => {
		this.currentView = tab
		this.refreshCurrentView(tab)
	}

	refreshCurrentView = () => {
		console.error('[REFRESH CURRENT VIEW NOT DEFINED]')
	}

}

decorate(Store, {
	currentView: observable,
	setCurrentView: action,
	refreshCurrentView: action,
	search: action
})

// You can remove this if you want to be able to directly change values rather than doing it through a setter function
configure({enforceActions: "observed"})
const globalStore = new Store()
export default globalStore;