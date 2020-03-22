import React from 'react';
import { uid } from "react-uid";
import './Explore.css';
import Amplify from 'aws-amplify';
import Post from '../Post/Post'
import Loader from '../Loader/Loader'
import marker from '../../images/location.png';

class Explore extends React.Component {
	state = {
		posts: [],
		features: [],
		loading: false,
		selectedPost: undefined
	}

	getAllPosts = (mapboxgl, map) => {
		Amplify.configure({
			API: {
				endpoints: [{
					name: 'getPosts',
					endpoint: this.props.store.apiEndpoint + '/getPosts', //change to get locations with new API
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});

		let getParams = {};

		Amplify.API.get('getPosts', '', getParams).then((response) => {
			const posts = [];
			const features = [];

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}

			response.forEach((post) => {
				posts.push({
					postID: post.postID,
					userID: post.userID,
					location: post.location,
					content: post.content,
					images: post.images,
					uploadTime: post.timeUploaded,
				});

				if (post.location.latitude && post.location.longitude) {
					features.push({
						'type': 'Feature',
						'properties': {
							'description': (post.postID).toString(),
							'icon': 'theatre'
						},
						'geometry': {
							'type': 'Point',
							'coordinates': [parseFloat(post.location.longitude), parseFloat(post.location.latitude)]
						}
					});
				}
			});

			this.setState({ posts: posts });
			this.setState({ features: features });

			console.log(JSON.stringify(this.state.features));

			// Plot features on map
			this.addFeatures(mapboxgl, map, this.state.features);
		}).catch((error) => {
			console.log(error);
		});
	}

	getSelectedPost = (postID) => {
		console.log(postID);
		this.setState({ loading: true });

		Amplify.configure({
			API: {
				endpoints: [{
					name: 'getPosts',
					endpoint: this.props.store.apiEndpoint + '/getPosts',
					service: 'api-gateway',
					region: 'us-east-1'
				}]
			}
		});

		let getParams = {};
		getParams = { queryStringParameters: { searchType: 'POST', searchParameter: postID } }

		Amplify.API.get('getPosts', '', getParams).then((response) => {
			let selectedPost = undefined;

			if (Object.entries(response).length === 0 && response.constructor === Object) {
				response = [];
			}

			response.forEach((post) => {
				selectedPost = {
					postID: post.postID,
					userID: post.userID,
					location: post.location,
					content: post.content,
					images: post.images,
					uploadTime: post.timeUploaded,
				};
			});

			console.log(selectedPost)
			this.setState({ loading: false });
			this.setState({ selectedPost: selectedPost });
		}).catch((error) => {
			console.log(error);
		});
	}

	addFeatures(mapboxgl, map, features) {
		map.on('load', () => {
			// map.loadImage(
			// 	'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
			// 	function (error, image) {
			// 		if (error) throw error;
			// 		map.addImage('cat', image);
			// 	}
			// );

			map.loadImage(marker, (error, image) => {
				if (error) throw error;
				map.addImage('post-icon', image);
			});

			map.addSource('places', {
				'type': 'geojson',
				'data': {
					'type': 'FeatureCollection',
					'features': features
				}
			});
			// Add a layer showing the places.
			map.addLayer({
				'id': 'places',
				'type': 'symbol',
				'source': 'places',
				'layout': {
					// 'icon-image': '{icon}-15',
					'icon-image': 'post-icon',
					'icon-allow-overlap': true,
					'icon-size': 0.3
				},
				"paint": {
					"icon-color": "#539038",
					// "text-color":"#9fcb3b",
					// "text-size":12
				}
			});

			// When a click event occurs on a feature in the places layer, open a popup at the
			// location of the feature, with description HTML from its properties.
			map.on('click', 'places', (e) => {
				let postID = e.features[0].properties.description;
				console.log(postID)
				this.getSelectedPost(parseInt(postID));
			});

			// Change the cursor to a pointer when the mouse is over the places layer.
			map.on('mouseenter', 'places', function () {
				map.getCanvas().style.cursor = 'pointer';
			});

			// Change it back to a pointer when it leaves.
			map.on('mouseleave', 'places', function () {
				map.getCanvas().style.cursor = '';
			});
		});
	}

	componentDidMount() {
		let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
		mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
		let map = new mapboxgl.Map({
			container: 'map', // container id
			style: 'mapbox://styles/ryanmarten/ck7jbiwkj34nv1io28t0c73ts',
			center: [-79.3949, 43.6529], // starting position - Toronto
			zoom: 10.99 // starting zoom - Includes KCS Senior School Location
		});

		// Add zoom and rotation controls to the map.
		map.addControl(new mapboxgl.NavigationControl());

		// Disable Scroll Zoom
		map.scrollZoom.disable();

		// Get all the posts and plot on the map 
		this.getAllPosts(mapboxgl, map);
	}

	render() {

		return (
			<div className="Explore dark-grey light-grey-text">
				<div id="map"></div>
				{this.state.loading ? <Loader /> : <Post store={this.props.store} post={this.state.selectedPost} />}
			</div>
		)
	}
};

export default Explore;
