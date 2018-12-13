import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import { MyMap } from './MyMap';
import MyPlaces from './MyPlaces';
import MySearch from './MySearch';
import './App.css';

class App extends Component {

state = {
  myPlaces: [
    {id: 1, name: 'Twin Lakes', location: {lat:36.9630493, lng: -88.2022803 }, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 2, name: 'Craven\'s Bay', location:{lat: 36.9603905, lng: -88.0623453}, category: 'Self Service Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 3, name: 'Denumbers Bay', location:{lat: 36.9803852, lng: -88.1604027}, category: 'Basic Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 4, name: 'Pisgah Point', location:{lat: 36.9367862, lng: -88.1705664}, category: 'Basic Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 5, name: 'Piney', location: {lat: 36.4862077, lng: -88.0360234}, category: 'Developed Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 6, name: 'Boswell Landing', location:{lat: 36.5237623, lng: -88.0413711}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 7, name: 'Sugar Bay', location: {lat: 36.8558963, lng: -88.1279951}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 8, name: 'Hillman Ferry', location: {lat: 36.9453869, lng: -88.188774}, category: 'Developed Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 9, name: 'Wranglers', location: {lat: 36.7377307, lng: -88.0022237,}, category: 'Developed Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 10, name: 'Energy Lake', location: {lat: 36.8553623, lng: -88.020011}, category: 'Developed Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 11, name: 'Redd Hollow', location: {lat: 36.719325, lng: -88.069013}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 12, name: 'Turkey Bay', location: {lat: 36.7506555, lng: -88.0737269}, category: 'Self Service Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 13, name: 'Fenton', location: {lat: 36.7740624, lng: -88.1098419 }, category: 'Self Service Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 14, name: 'Colson Hollow', location: {lat: 36.7254919, lng: -88.0785244}, category: 'Group Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 15, name: 'Gatlin Point', location: {lat: 36.5568261, lng: -87.9061013}, category: 'Self Service Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 16, name: 'Ginger Bay', location: {lat: 36.6238099, lng: -88.0390581}, category: 'Basic Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 17, name: 'Taylor Bay', location: {lat: 36.8835553, lng: -88.022359}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 18, name: 'Nickell Branch', location: {lat: 36.987723, lng: -88.2029253}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 19, name: 'Birmingham Ferry', location: {lat: 36.9183498, lng: -88.1768163}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 20, name: 'Smith Bay', location: {lat: 36.9088002, lng: -88.1503298}, category: 'Basic Campground', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 21, name: 'Neville Bay', location: {lat: 36.6054647,lng: -87.994998}, category: 'Basic Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
    {id: 22, name: 'Gray\'s Landing', location: {lat: 36.4484627, lng: -88.0464552}, category: 'Basic Camping Area', showPlace: true, markerPin: 'pink-pin.png' },
  ],
  searchQuery: '',
  markers: [],
  onClickURL:'pink-pin.png',
  markerURL: 'blue-pin.png',
  mouseOverURL: 'yellow-pin.png',

}

componentDidMount() {
  this.setMarkers (true);
}


  setMarkers = (showAll) => {
    let markers = this.state.markers;
    let myPlaces = this.state.myPlaces;
    showAll ?
      markers =
        myPlaces.map (place => {
          place.markerPin = this.state.markerURL;
          return place;
        })
      :
      markers =
        myPlaces
          .filter  ( place => {
            return place.showPlace === true;
          })
          .map (place => {
            place.markerPin = this.state.markerURL;
            return place;
          });


    this.setState ({markers});
  };

  handleOnClick = (event, clickedMarker) => {
    console.log ('handleOnClick: markerPin = ' + clickedMarker.markerPin);
    (clickedMarker.markerPin === this.state.onClickURL) ?
      this.setMarkerIcon (clickedMarker, this.state.markerURL)
      : this.setMarkerIcon (clickedMarker, this.state.onClickURL);
  };

  handleMouseOver = (hilightMarker) => {
    console.log ('handleMouseOver: markerPin = ' + hilightMarker.markerPin);
    (hilightMarker.markerPin === this.state.onClickURL) ?
      this.setMarkerIcon (hilightMarker, this.state.onClickURL)
      : this.setMarkerIcon (hilightMarker, this.state.mouseOverURL);
  }

  handleMouseOut = (hilightMarker) => {
    console.log ('handleMouseOut: markerPin, onClickURL = ' + hilightMarker.markerPin + ', ' + this.state.onClickURL);
    console.log ('hilightMarker.markerPin === this.state.onClickURL = ' + hilightMarker.markerPin === this.state.onClick);
    hilightMarker.markerPin === this.state.onClickURL ?
      this.setMarkerIcon (hilightMarker, this.state.onClickURL)
      : this.setMarkerIcon (hilightMarker, this.state.markerURL);
  }

  setMarkerIcon = (markerToUpdate, markerIcon) => {
    console.log ('setMarkerIcon: markerToUpdate, markerIcon = ' + markerToUpdate.markerPin + ', ' + markerIcon );
    let newMarkers = this.state.markers.map (marker => {
      return marker;});
    let xMarksTheSpot = newMarkers.findIndex (marker => marker.id === markerToUpdate.id);
    newMarkers[xMarksTheSpot].markerPin = markerIcon;
    this.setState({markers: newMarkers});
  }

  setShowAllMyPlaces = (value) => {
    let myPlaces = this.state.myPlaces;
    myPlaces.map ( place => {
      place.showPlace = value;
      return place;}
    );
    this.setState ({myPlaces});
    this.setMarkers (true);
  };

  setShowMyPlacesFromQuery = (searchFor) => {

    let myPlaces = this.state.myPlaces;


    this.setShowAllMyPlaces (false);

    /* get list of places that match the query */

    let foundPlaces = myPlaces
      .filter ( place => {
        return place.name.indexOf (searchFor) > -1;
      });
    console.log ('setShowMyPlacesFromQuery - foundPlaces = ' + foundPlaces);
    /* set each place to show / hide values */
    if (foundPlaces.length > 0) {

      myPlaces.map (place => {
        let xMarksTheSpot = foundPlaces.findIndex (foundPlace => foundPlace.id === place.id);
        return (
          place.showPlace = xMarksTheSpot >= 0
        );
      });
    }
    this.setMarkers (false);
    console.log ('just before setState - myPlaces = ' + this.state.myPlaces[1]);
    this.setState ({myPlaces});
    console.log ('just after setState - myPlaces = ' + this.state.myPlaces[1]);
  }

  updateQuery = (searchQuery) => {

    /*
      If search query is not empty, search for capmgrounds.
      If search returns data, then update MyPlaces.showPlace.
      If search does not return any data then hide all isMarkerShown = false
      If search query is empty, then set isMarkerShown = true for all
    */
    console.log ('in updateQuery - searchQuery = ' + searchQuery)
    this.setState({searchQuery});
    searchQuery ?
      this.setShowMyPlacesFromQuery (searchQuery) :
      this.setShowAllMyPlaces (true);

  }

  render() {

    return (
      <div>
        <Route exact path="/"  render={() => (
          <div className = "container">
            <div className = "options-box">
              <h1> Land Between the Lakes </h1>
              <h2> Camp Sites </h2>
              <div>
                <MySearch
                  myPlaces = {this.state.myPlaces.sort(sortBy('name'))}
                  setShowAllMyPlaces = {this.setShowAllMyPlaces}
                  setShowMyPlacesFromQuery = {this.setShowMyPlacesFromQuery}
                  updateQuery = {this.updateQuery}
                  searchQuery = {this.state.searchQuery}

                />
              </div>
              <div>
                <ul>
                  <MyPlaces
                    myPlaces = {this.state.myPlaces}
                    handleOnClick = {this.handleOnClick}
                  />
                </ul>
                <ol>SideBar
                  <li>Filter campgrounds by category</li>
                  <li>Change marker color and show infobox when campground selected from list</li>
                  <li>call camping api and display details when campground selected from list </li>
                  <li>show/hide sidebar</li>
                </ol>
                <ol>Map
                  <li>show infobox on marker click</li>
                  <li>select campground on list (and camping api details) </li>
                </ol>
                <a href="https://review.udacity.com/#!/rubrics/1351/view">Neighborhood Project Ruberic</a>
              </div>

            </div>
            <div className='map'>
              <MyMap
                markers = {this.state.markers}
                handleOnClick = {this.handleOnClick}
                handleMouseOver = {this.handleMouseOver}
                handleMouseOut = {this.handleMouseOut}
              />
            </div>
          </div>
        )}/>

      </div>
    );
  }
}

export default App;
