import React from 'react';
import './MiddleView.css';

import PostFeed from '../PostFeed/PostFeed'
import SearchUser from '../SearchUser/SearchUser'
import CreatePost from '../CreatePost/CreatePost'
import Explore from '../Explore/Explore'

class MiddleView extends React.Component {
	state = {
		tab: <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } /></div>
	}

	currentViewSwitch = (currentView) => {
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
				this.setState({ tab: <div><CreatePost store={ this.props.store } /><PostFeed store={ this.props.store } /></div> });
				return;
		}
	}

	render() {
		this.props.store.refreshCurrentView = this.currentViewSwitch

		return (
		<div className="MiddleView dark-grey light-grey-text">
			{ this.state.tab }
		</div>
	)}
};

export default MiddleView;
