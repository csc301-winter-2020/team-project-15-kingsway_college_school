import React from 'react';
import { uid } from "react-uid";
import './Explore.css';

class Explore extends React.Component {
	state = {}

	// componentDidMount() {
	// 	var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

	// 	mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
	// 	var map = new mapboxgl.Map({
	// 	container: 'map',
	// 	style: 'mapbox://styles/mapbox/streets-v11'
	// 	});
	// }

	componentDidMount(){
			var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
			mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
			var map = new mapboxgl.Map({
			container: 'map', // container id
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-74.5, 40], // starting position
			zoom: 9 // starting zoom
			});
			
			// Add zoom and rotation controls to the map.
			map.addControl(new mapboxgl.NavigationControl());
	}

	render() {
		
		return (
		<div className="Explore dark-grey light-grey-text">
			Explore Page NEW!
			<div id="map" height="100px" width="100px"></div>
		</div>
	)}
};

export default Explore;
