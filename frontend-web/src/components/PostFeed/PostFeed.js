import React from 'react';
import { uid } from "react-uid";
import './PostFeed.css';
import Amplify from 'aws-amplify';
import { Auth, Storage } from 'aws-amplify';
import Post from '../Post/Post'
import Loader from '../Loader/Loader'
import {  observer } from "mobx-react"


const PostFeed = observer(class PostFeed extends React.Component {
	state = {
		hasPosts: false,
		posts: []
	}

	callPostsApi = async (session, feedType, searchTerm) => {

		let getParams = {};

		const userID = this.props.store.userID;

		if (feedType === 'Home') {
			if (searchTerm) {
				getParams = { queryStringParameters: { searchType: 'TAG', searchParameter: searchTerm } };
			}
		} else if (feedType === 'My Posts') {
			getParams = { queryStringParameters: { searchType: 'OWN' } };
		} else if (feedType === 'Favourites') {
			getParams = { queryStringParameters: { searchType: 'FAV' } };
		} else if (feedType === 'Permalink') {
			getParams = { queryStringParameters: { searchType: 'POST' } };
		} else if (feedType === 'Search User') {
			getParams = { queryStringParameters: { searchType: 'EMAIL', searchParameter: searchTerm } };

		}

		try {
			getParams["headers"] = {"Authorization" : session.idToken.jwtToken}
		} catch {
			return
		}
		
		let currCreds
		Auth.currentCredentials().then(response => {
					currCreds = response

		}).catch((err) => {
			console.log('error on current credentials call')
			console.log(err)
		})
		await Amplify.API.get('getPosts', '', getParams).then((response) => {
			const posts = [];

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}
			if (response.length != 0) {
				response.forEach((post, outerIndex) => {
					post.images.map( async (imageKey, innerIndex) => {
						let imageKeyUrl;
						var imageBase64; 
						let imageUrl;
						let headers = { "headers"  : { "Authorization" : session.idToken.jwtToken}}
						// await Storage.get(imageKey, { download: true }).then(result =>  console.log(result))
						var aws = require("aws-sdk")
						currCreds = await Auth.currentCredentials();
						aws.config.update({region: 'us-east-1', credentials: currCreds});
						const s3 = new aws.S3(); // Pass in opts to S3 if necessary
						var getParams = {
							Bucket: 'kcpostimages', // your bucket name,
							Key: imageKey, // path to the object you're looking for
						}

						await s3.getObject(getParams, (err, data) => {
							// Handle any error and exit
							if (err){
								console.log(err)
								return err;
							}
							// No error happened
							// Convert Body from a Buffer to a String
							let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
							imageBase64 = objectData;
							this.setState({ hasPosts: false });
							try {
								this.state.posts[outerIndex].images[innerIndex] = imageBase64
							} catch {}

							this.setState({ hasPosts: true });
							this.forceUpdate()
						});
					});

					const new_post = {
						postID: post.postID,
						userID: post.userID,
						location: post.location,
						content: post.content,
						images: post.images,
            			favourited: post.favourited,
						uploadTime: post.timeUploaded
					}

					if (post.email) {
						new_post['email'] = post.email
					}

					posts.push(new_post);
				});
			}

			this.setState({ posts: posts, hasPosts: true });
			this.forceUpdate()
		}).catch((error) => {
			console.log(error);
		});
	}

	getPosts = async (feedType, searchTerm) => {
		this.setState({ hasPosts: false });
		this.callPostsApi(this.props.store.session, feedType, searchTerm)
	}

	search = (searchTerm) => {
		this.setState({ hasPosts: false, posts: [] });

		const feedType = this.props.store.currentView;

		this.getPosts(feedType, searchTerm);
	}

	componentDidMount() {
		const feedType = this.props.store.currentView;

		if (feedType === 'Search User') {
			this.props.parent.searchUser = (email) => { console.log(email); this.getPosts(feedType, email) }
		} else if (feedType === 'Permalink') {
			this.getPosts(feedType, this.props.idToken) 
		}

		if (!this.props.preventDefaultLoad) {
			this.getPosts(feedType);
		} else {
			this.setState({ hasPosts: true });
		}

		this.props.store.search = this.search;
	}

	render() {
		this.props.store.updateFeedCallback = [ () => { this.setState({ posts: [], hasPosts: false }); this.getPosts(this.props.store.currentView) }];

		return (
		<div className="PostFeed light-grey-text">
			{ this.state.hasPosts ? '' : <Loader short={ this.state.posts.length != 0 } /> }
			{
				this.state.posts.map((post) => (
					<Post store={ this.props.store } key={ uid(post.postID) } post={ post } enableLoader={ () => { this.setState({ hasPosts: false }); } } />
				))
			}
		</div>
	)}
})

export default PostFeed;
