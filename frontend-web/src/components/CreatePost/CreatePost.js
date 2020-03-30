import React from "react";
import { uid } from "react-uid";
import "./CreatePost.css";
import Amplify from "aws-amplify";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

class CreatePost extends React.Component {
  state = {
    postData: "",
    attachment: undefined,
    lat: undefined,
    long: undefined,
    locName: undefined,
    viewport: {
      latitude: -79.3949,
      longitude: 43.6529,
      zoom: 8
    }
  };

  mapAccess =
    "pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ";

  postDataChanged = e => {
    this.setState({ postData: e.target.value });
  };

  fileUploaded = e => {
    try {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        () => {
          this.setState({ attachment: reader.result });
        },
        false
      );

      reader.readAsDataURL(e.target.files[0]);
    } catch (e) {}
  };

  handleSubmit = e => {
    e.preventDefault();

    const imageParam = this.state.attachment ? [this.state.attachment] : [];

    const reqParams = {
      body: {
        content: this.state.postData,
        images: imageParam
      }
    };

    if (this.state.locName && this.state.lat && this.state.long) {
      reqParams.body["location"] = {
        name: this.state.locName,
        latitude: this.state.lat.toString(),
        longitude: this.state.long.toString()
      };
    }

    reqParams["headers"] = {
      Authorization: this.props.store.session.idToken.jwtToken
    };

    Amplify.API.post("newPost", "", reqParams)
      .then(response => {
        this.props.store.updateFeeds();
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({ postData: "", attachment: undefined });
    e.target.reset();
  };


  componentDidMount() {
    // NOT USING AUTOMATIC LOCATION
	// navigator.geolocation.getCurrentPosition(this.acquiredLocation, undefined);
	//document.getElementsByTagName("input")[0].placeholder = "Tag a Location!";
	mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
    const map = new mapboxgl.Map({
			container: this.mapContainer, // container id
			style: 'mapbox://styles/ryanmarten/ck7jbiwkj34nv1io28t0c73ts',
			center: [this.state.viewport.latitude, this.state.viewport.longitude], // starting position - Toronto
			zoom: this.state.viewport.zoom // starting zoom - Includes KCS Senior School Location
		});

    const toronto = {};
    toronto.latitude = -79.36656674779857;
    toronto.longitude = 43.629389142603856;
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      flyto: {
        bearing: 0,
        speed: 0.2,
        curve: 1,
        easing: function (t) {
          return t;
        }
      },
      proximity: toronto,
      types: "poi",
      trackProximity: true,
      placeholder: "Tag a Location!",
      collapsed: true
    });
    map.addControl(geocoder);
    //document.getElementById('geocoderContainer').appendChild(geocoder.onAdd(map));
  }

  onSelected = (viewport, item) => {
    //console.log('Selected: ', item)
    //console.log("lat: ", item.center[1], "long: ", item.center[0])
    this.setState({ lat: item.center[1], long: item.center[0] });
    //console.log("place: ", item.place_name)
    this.setState({ locName: item.place_name });
  };

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...viewport }
    })
  }

  handleOnResult = event =>{
    console.log(event.result.geometry);
  }

  render() {
    const viewport = this.state.viewport;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="CreatePost mid-mid-grey rounded shadow light-grey-text">
          <h2>Post a new experience!</h2>
          <div className="PickLocation"></div>
          <div className="TextAreaContainer rounded">
            <textarea
              id="new-post-textarea"
              className="rounded"
              onChange={this.postDataChanged}
              placeholder="Share an experience"
            />
          </div>
          <div className="CreatePostButtons">
            <input
              id="fileUpload"
              type="file"
              name="file"
              className="hidden"
              onChange={ this.fileUploaded }
            />
            <label
              htmlFor="fileUpload"
              className="AttachPicture fa fa-paperclip"
            ></label>
            <i className="accent fa fa-map-marker Pin"></i>
            <input
              type="submit"
              className="ShareButton rounded-15 light-grey dark-grey-text"
              value="Share"
            />
          </div>
            <div ref={el => this.mapContainer = el} className="mapContainer"/>
         	{ this.state.attachment ? <img className="PreviewImage" src={ this.state.attachment }/> : '' }
        </div>
      </form>
    );
  }
}

export default CreatePost;
