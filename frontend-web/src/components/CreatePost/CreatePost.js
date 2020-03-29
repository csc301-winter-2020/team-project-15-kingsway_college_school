import React from "react";
import { uid } from "react-uid";
import "./CreatePost.css";
import Amplify from "aws-amplify";
import mapboxgl from "mapbox-gl";

import Geocoder from "react-mapbox-gl-geocoder";

class CreatePost extends React.Component {
  state = {
    postData: "",
    attachment: undefined,
    lat: undefined,
    long: undefined,
    locName: undefined
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

    console.log(reqParams)

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

  acquiredLocation = pos => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    var xhr = new XMLHttpRequest();

    xhr.onload = () => {
      try {
        let full_name = JSON.parse(xhr.responseText).features[0].place_name;

        this.setState({ locName: full_name });
      } catch {}
    };

    // Only uses POI (points of interests --> remove this to get the best guess address at current location)
    xhr.open(
      "GET",
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=poi&access_token=pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ`
    );
    xhr.responseType = "text";
    xhr.send();

    this.setState({ lat: latitude, long: longitude });
  };

  componentDidMount() {
    // NOT USING AUTOMATIC LOCATION
    navigator.geolocation.getCurrentPosition(this.acquiredLocation, undefined);
  }

  onSelected = (viewport, item) => {
    //console.log('Selected: ', item)
    //console.log("lat: ", item.center[1], "long: ", item.center[0])
    this.setState({ lat: item.center[1], long: item.center[0] });
    //console.log("place: ", item.place_name)
    this.setState({ locName: item.place_name });
  };

  render() {
    // const queryParams = {
    // 	country: 'us'
    // }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="CreatePost mid-mid-grey rounded shadow light-grey-text">
          <h2>Post a new experience!</h2>
          <div className="PickLocation">
		  		<i className="accent fa fa-map-marker Pin"></i>
            <Geocoder
              mapboxApiAccessToken={this.mapAccess}
              onSelected={this.onSelected}
              hideOnSelect={true}
              initialInputValue="Tag Your Location"
              updateInputOnSelect={true}
            />
          </div>
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
            <input
              type="submit"
              className="ShareButton rounded-15 light-grey dark-grey-text"
              value="Share"
            />
          </div>
         	{ this.state.attachment ? <img className="PreviewImage" src={ this.state.attachment }/> : '' }
        </div>
      </form>
    );
  }
}

export default CreatePost;
