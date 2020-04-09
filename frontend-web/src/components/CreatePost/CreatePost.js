import React from "react";
import {uid} from "react-uid";
import "./CreatePost.css";
import Amplify from "aws-amplify";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

class CreatePost extends React.Component {
    state = {
        postData: "",
        attachment: undefined,
        viewport: {
            longitude: -79.3949,
            latitude: 43.6529,
            zoom: 8
        },
        location : {
            locName: undefined,
            longitude: -79.3949,
            latitude: 43.6529,
        },
        mapState : "default"
    };

    mapAccess =
        "pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ";

    postDataChanged = e => {
        this.setState({postData: e.target.value});
    };

    fileUploaded = e => {
        try {
            const reader = new FileReader();

            reader.addEventListener(
                "load",
                () => {
                    this.setState({attachment: reader.result});
                },
                false
            );

            reader.readAsDataURL(e.target.files[0]);
        } catch (e) {
        }
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

        if (this.state.locName) {
            reqParams.body["location"] = {
                name: this.state.location.locName,
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
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

        this.setState({postData: "", attachment: undefined});
        e.target.reset();
    };


    componentDidMount() {
        // NOT USING AUTOMATIC LOCATION
        // navigator.geolocation.getCurrentPosition(this.acquiredLocation, undefined);
        //document.getElementsByTagName("input")[0].placeholder = "Tag a Location!";
        mapboxgl.accessToken = 'pk.eyJ1Ijoicnlhbm1hcnRlbiIsImEiOiJjazc5aDZ6Zmgwcno0M29zN28zZHQzOXdkIn0.aXAWfSB_yY8MzA2DajzgBQ';
        const toronto = {};
        toronto.longitude = -79.36656674779857;
        toronto.latitude = 43.629389142603856;
        const map = new mapboxgl.Map({
            container: this.mapContainer, // container id
            style: 'mapbox://styles/ryanmarten/ck7jbiwkj34nv1io28t0c73ts',
            center: [this.state.viewport.longitude, this.state.viewport.latitude], // starting position - Toronto
            zoom: this.state.viewport.zoom // starting zoom - Includes KCS Senior School Location
        });
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: false
            })
        );

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
            language: "en",
            types: "poi",
            proximity: toronto,
            trackProximity: true, //tracking proximity causes it to not pass in proximity sometimes
            placeholder: "Tag a Location!",
            collapsed: false
        });
        geocoder.addTo('#geocoder-container');
        geocoder.on("result", this.handleOnResult)
        //document.getElementById('geocoderContainer').appendChild(geocoder.onAdd(map));
    }

    onSelected = (viewport, item) => {
        //console.log('Selected: ', item)
        //console.log("lat: ", item.center[1], "long: ", item.center[0])
        this.setState({lat: item.center[1], long: item.center[0]});
        //console.log("place: ", item.place_name)
        this.setState({locName: item.place_name});
    };

    handleViewportChange = (viewport) => {
        this.setState({
            viewport: {...viewport}
        })
    };

    MapButtonEvent = (event) => {

        //Check wether to show or hide the map
        if(this.state.mapState === "default"){
            this.setState({mapState : "expanded"})
            //If hiding the map
            //check if the user has saved a location to the box
            //if they have leave the location search bar expanded
            // if they haven't close it too
        }else{
            if(this.state.locName){
                this.setState({mapState : "collapsed"})
            }else{
                 this.setState({mapState : "default"})
            }
        }
        console.log(this.state.mapState)
    };

    handleOnResult = result => {
        console.log(result);
        this.setState({
            location : { locName : result.place_name_en}
        });
    }

    render() {
        const viewport = this.state.viewport;
        const mapState = this.state.mapState;
        console.log(`mapContainer ${mapState}`);
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="CreatePost mid-mid-grey rounded shadow light-grey-text">
                    <h2>Post a new experience!</h2>
                    <div className="TextAreaContainer rounded">
                <textarea
                    id="new-post-textarea"
                    className="rounded"
                    onChange={this.postDataChanged}
                    placeholder="Share an experience"
                /></div>
                    <div className="CreatePostButtons">
                            <label onClick={this.MapButtonEvent} className="LocationButton fa fa-map-marker"></label>
                            <input
                                id="fileUpload"
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={this.fileUploaded}
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
                            <div className={"geocoderSizeController"}>
                                <div id={"geocoder-container"} className={`geocoderContainer ${mapState}`} />
                            </div>
                    </div>
                    <div className={`mapSizeController ${mapState}`}>
                    <div ref={el => this.mapContainer = el} class={"mapContainer"}/>
                    </div>
                    {this.state.attachment ? <img className="PreviewImage" src={this.state.attachment}/> : ''}
                </div>
            </form>
    );
    }
}
    export default CreatePost;
