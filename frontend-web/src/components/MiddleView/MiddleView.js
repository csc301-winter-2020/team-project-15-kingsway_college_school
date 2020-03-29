import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import SearchUser from '../SearchUser/SearchUser'
import CreatePost from '../CreatePost/CreatePost'
import Explore from '../Explore/Explore'

class MiddleView extends React.Component {
	state = {
		tab: <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } /></div>,
		div: undefined
	}

	currentViewSwitch = (currentView, term) => {
		switch(currentView) {
			case 'My Posts':
				this.setState({ tab: <PostFeed store={ this.props.store } /> });
				return;
			case 'Search User':
				this.setState({ tab: <SearchUser store={ this.props.store } /> });
        		return;
			case 'Favourites':
				this.setState({ tab: <PostFeed store={ this.props.store } /> });
				return;
			case 'Explore':
				this.setState({ tab: <Explore store={ this.props.store } /> });
				return;
			default:
				this.setState({ tab: <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } searchTerm={ term }/></div> });
				return;
		}
	}

	// adapted from https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
	debounce = (func, wait, immediate) => {
		var timeout

		return function executedFunction() {
			var context = this
			var args = arguments

			var later = function() {
				timeout = null
				if (!immediate) func.apply(context, args)
			};

			var callNow = immediate && !timeout

			clearTimeout(timeout)

			timeout = setTimeout(later, wait)

			if (callNow) func.apply(context, args)
		}
	}

	debouncedGetNextPage = this.debounce( this.props.store.getNextPage, 600, true)

	 loadPostsIfEndOfPage = () => {
			if (window.innerHeight + window.scrollY - this.state.div.scrollHeight >= 0) {
				this.debouncedGetNextPage()
			}
		}

	componentDidMount() {
		window.addEventListener('scroll', this.loadPostsIfEndOfPage)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.loadPostsIfEndOfPage)
	}

	render() {
		this.props.store.refreshCurrentView = this.currentViewSwitch

		return (
		<div ref={ (div) => { this.state.div = div } } className="MiddleView dark-grey light-grey-text">
			{ this.state.tab }
		</div>
	)}
};

export default MiddleView;
