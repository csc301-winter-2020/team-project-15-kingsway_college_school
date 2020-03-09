import React from 'react';
import { uid } from "react-uid";
import './Explore.css';
import Amplify from 'aws-amplify';
import Post from '../Post/Post'

class Explore extends React.Component {
	state = { posts: [],
		features: [],
		selectedPost: undefined}

	// componentDidMount() {
	// 	var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

	// 	mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
	// 	var map = new mapboxgl.Map({
	// 	container: 'map',
	// 	style: 'mapbox://styles/mapbox/streets-v11'
	// 	});
	// }

	example_features = [{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
		'icon': 'theatre'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.3955760625,
			43.664033062499996]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
		'icon': 'theatre'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.3889755,
			43.659828000000005]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
		'icon': 'bar'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.52082,
			43.656997]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
		'icon': 'art-gallery'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.384049,
			43.65332325]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
		'icon': 'bicycle'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.461814,
			43.645765]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
		'icon': 'rocket'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.323671,
			43.63418]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
		'icon': 'music'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [ -79.389711,
			43.657701]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Museum of Contemporary Art</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
		'icon': 'music'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.445138,
			43.654579]
		}
		},
		{
		'type': 'Feature',
		'properties': {
		'description':
		'<strong>Art Gallery of Ontario</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">AGO</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
		'icon': 'music'
		},
		'geometry': {
		'type': 'Point',
		'coordinates': [-79.3928515,
			43.653946000000005]
		}
		}];

	saved_features = [{"type":"Feature","properties":{"description":"24","icon":"theatre"},"geometry":{"type":"Point","coordinates":[-79.3976539,43.6591399]}}];

	getAllPosts = (mapboxgl, map) => {
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

				if (post.location.latitude && post.location.longitude){
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

			this.setState({posts: posts});
			this.setState({features: features});

			console.log(JSON.stringify(this.state.features));

			// Plot features on map
			this.popUps(mapboxgl, map, this.state.features);
		}).catch((error) => {
			console.log(error);
		});
	}

	getSelectedPost = (postID) => {
		console.log(postID);

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
			this.setState({selectedPost: selectedPost});
		}).catch((error) => {
			console.log(error);
		});
	}

	popUps(mapboxgl, map, features){
		// map.on('load', () => { CHANGE THE WAY IT LOADS
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
			'icon-image': '{icon}-15',
			'icon-allow-overlap': true
			},
			"paint": {
	            "icon-color":"#539038",
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
			
			// var coordinates = e.features[0].geometry.coordinates.slice();
			// var description = e.features[0].properties.description;
			 
			// // Ensure that if the map is zoomed out such that multiple
			// // copies of the feature are visible, the popup appears
			// // over the copy being pointed to.
			// while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			// coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			// }
			 
			// new mapboxgl.Popup()
			// .setLngLat(coordinates)
			// .setHTML(description)
			// .addTo(map);
			});
			 
			// Change the cursor to a pointer when the mouse is over the places layer.
			map.on('mouseenter', 'places', function() {
			map.getCanvas().style.cursor = 'pointer';
			});
			 
			// Change it back to a pointer when it leaves.
			map.on('mouseleave', 'places', function() {
			map.getCanvas().style.cursor = '';
			});
			// }); CHANGE THE WAY IT LOADS
	}

	componentDidMount(){
			let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
			mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
			let map = new mapboxgl.Map({
			container: 'map', // container id
			// style: 'mapbox://styles/mapbox/streets-v11',
			style: 'mapbox://styles/ryanmarten/ck7jbiwkj34nv1io28t0c73ts',
			center: [-79.3949, 43.6529], // starting position
			zoom: 10.99 // starting zoom
			});
			
			// Add zoom and rotation controls to the map.
			map.addControl(new mapboxgl.NavigationControl());

			this.getAllPosts(mapboxgl, map);
			
			// used this.saved_features for test
			// this.popUps(mapboxgl, map, this.saved_features);
			// this.getSelectedPost(postID)
	}

	render() {
		
		return (
		<div className="Explore dark-grey light-grey-text">
			<div id="map"></div>
			<Post store={ this.props.store } post={ this.state.selectedPost } />
		</div>
	)}
};

export default Explore;
