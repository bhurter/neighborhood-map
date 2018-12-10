import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyMap from './MyMap';
import './App.css';

class App extends Component {

  state = {
    mapAPIKey: 'AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM',
    campingAPIKey: 'ruwjtgd4gddf3nz4xasnchge',
    mapCenter: {lat: 36.7856242, lng: -88.0329686},
    mapZoom: 10,
    markerLocations: [
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
      {id: 11, name: 'Redd Hollow', location: {lat: 36.713395, lng: -88.0765745}, category: 'Basic Campground'},
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
    ],
    markers: [],
    filteredMarkers: []
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>

        <div className = "options-box">
          <h1> Land Between the Lakes </h1>
          <h2> Camp Sites </h2>
          <div>
            <p> stuff goes here </p>
          </div>
        </div>
        <Route exact path="/"  render={() => (

          <MyMap
            myAPIKey = {this.state.mapAPIKey}
            mapCenter = {this.state.mapCenter}
            mapZoom = {this.state.mapZoom}
            markerLocations = {this.state.markerLocations}
          />

        )}/>

      </div>
    );
  }
}

export default App;
