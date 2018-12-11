import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

let markerPin = 'pink-pin.png';

let handleMouseClick = () => {
  console.log ('Mouse click' );
};

let handleMouseOver = () => {
  console.log ('Mouse Over');
};

let handleMouseOut = () => {
  console.log ('Mouse Out');
};

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultCenter={{lat: 36.7856242, lng: -88.0329686}}
    defaultZoom={10}

  >
    { markerLocations.map (marker => (

      <Marker
        key={marker.id}
        position={marker.location}
        icon = {markerPin}
        title= { marker.name }
        defaultAnimation={2}
        onClick = { handleMouseClick()}
        onMouseOver = {handleMouseOver()}
        onMouseOut = {handleMouseOut()}
      />
    ))}
  </GoogleMap>
));
/*
<MyMapComponent
  isMarkerShown
  googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM'}
  loadingElement={<div style={{ height: '100%' }} />}
  containerElement={<div style={{ height: '400px' }} />}
  mapElement={<div style={{ height: '100%' }} />}
/>; */

const  markerLocations = [
  {id: 1, name: 'Twin Lakes', location: {lat:36.9630493, lng: -88.2022803 }, category: 'Basic Campground'},
  {id: 2, name: 'Craven\'s Bay', location:{lat: 36.9603905, lng: -88.0623453}, category: 'Self Service Campground'},
  {id: 3, name: 'Denumbers Bay', location:{lat: 36.9803852, lng: -88.1604027}, category: 'Basic Camping Area'},
  {id: 4, name: 'Pisgah Point', location:{lat: 36.9367862, lng: -88.1705664}, category: 'Basic Camping Area'},
  {id: 5, name: 'Piney', location: {lat: 36.4862077, lng: -88.0360234}, category: 'Developed Campground'},
  {id: 6, name: 'Boswell Landing', location:{lat: 36.5237623, lng: -88.0413711}, category: 'Basic Campground'},
  {id: 7, name: 'Sugar Bay', location: {lat: 36.8558963, lng: -88.1279951}, category: 'Basic Campground'},
  {id: 8, name: 'Hillman Ferry', location: {lat: 36.9453869, lng: -88.188774}, category: 'Developed Campground'},
  {id: 9, name: 'Wranglers', location: {lat: 36.7377307, lng: -88.0022237,}, category: 'Developed Campground'},
  {id: 10, name: 'Energy Lake', location: {lat: 36.8553623, lng: -88.020011}, category: 'Developed Campground'},
  {id: 11, name: 'Redd Hollow', location: {lat: 36.719325, lng: -88.069013}, category: 'Basic Campground'},
  {id: 12, name: 'Turkey Bay', location: {lat: 36.7506555, lng: -88.0737269}, category: 'Self Service Campground'},
  {id: 13, name: 'Fenton', location: {lat: 36.7740624, lng: -88.1098419 }, category: 'Self Service Campground'},
  {id: 14, name: 'Colson Hollow', location: {lat: 36.7254919, lng: -88.0785244}, category: 'Group Camping Area'},
  {id: 15, name: 'Gatlin Point', location: {lat: 36.5568261, lng: -87.9061013}, category: 'Self Service Campground'},
  {id: 16, name: 'Ginger Bay', location: {lat: 36.6238099, lng: -88.0390581}, category: 'Basic Camping Area'},
  {id: 17, name: 'Taylor Bay', location: {lat: 36.8835553, lng: -88.022359}, category: 'Basic Campground'},
  {id: 18, name: 'Nickell Branch', location: {lat: 36.987723, lng: -88.2029253}, category: 'Basic Campground'},
  {id: 19, name: 'Birmingham Ferry', location: {lat: 36.9183498, lng: -88.1768163}, category: 'Basic Campground'},
  {id: 20, name: 'Smith Bay', location: {lat: 36.9088002, lng: -88.1503298}, category: 'Basic Campground'},
  {id: 21, name: 'Neville Bay', location: {lat: 36.6054647,lng: -87.994998}, category: 'Basic Camping Area'},
  {id: 22, name: 'Gray\'s Landing', location: {lat: 36.4484627, lng: -88.0464552}, category: 'Basic Camping Area'},
];


class MyMap extends Component {

  state = {
    isMarkerShown: true,
    animation: 2,
  }

  componentDidMount() {

  }

  render() {

    return (
      <div id='map' style={{ height: '100vh', width: '100%' }}>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM'}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        >
        </MyMapComponent>

      </div>
    );
  }
}


export default MyMap;
