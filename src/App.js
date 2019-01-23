import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import {Online, Offline} from 'react-detect-offline';


import { Map } from './Map';
import Header from './Header';
import Places from './Places';
import Search from './Search';
import SiteDetails from './SiteDetails';
import Campgrounds from './data/lbl-campsites';
import './App.css';

class App extends Component {

/*******************************************************************************
 *
 *  The App component is the main application.  It manages the rendering of the
 *  entire main page and manages state changes and user actions.
 *
 ******************************************************************************/

state = {
  myPlaces: [],                     // array of interesting places.
  searchQuery: '',                  // current query in the search box
  markers: [],                      // array of markers to be shown on the map
  selectedMarker:'/images/pink-pin.png',    // icon for the selected marker
  standardMarker: '/images/blue-pin.png',   // icon for the un-selected marker
  hoverMarker: '/images/yellow-pin.png',    // icon to show when hovering over a marker
  activeMarker: -1,                 // id of the currently selected marker
  showSideBar: true,                // indicates whether or not the sidebar is visible
  defaultCenter: {                  // default map center
    lat: 36.7856242,
    lng: -88.0329686}
}

componentDidMount() {

  // Load the campground data
  let campgrounds =  Campgrounds.map (campground => {
    return campground;
  });

  // Sort the list of campgrounds alphabetically */
  campgrounds.sort(sortBy('name'));

  // save the interesting places and list of current markers in the current state */

  this.setState({
    myPlaces: campgrounds,
    markers: campgrounds});
}

/*******************************************************************************
 *
 *  The closeInfoBox function is the callback to handle the user action to
 *  close the infoBox that is currently showing on the map.  It calls the
 *  handleOnClick function to set the marker icon to unselected.
 *
 ******************************************************************************/

  closeInfoBox = (event, infoBoxMarker) => {
    this.handleOnClick (event, infoBoxMarker);
  };

  /*****************************************************************************
   *
   *  The handleListClick function is the callback to handle the user action
   *  when they click on an entry in the list box.  It calls the handleOnClick
   *  function to set set the marker icon appropriately, based on whether or
   *  not the list item is already selected.
   *
   ****************************************************************************/

  findIdIndex = (placeArray, ID) => {
    return placeArray.findIndex (place => place.id === ID);
  }

  handleListClick = (event, clickedItem) => {
    this.handleOnClick (event, clickedItem);
  }

  /*****************************************************************************
   *
   *  The handleMouseOut function is the callback to handle when the user
   *  mouse moves off of a marker on the map.
   *
   *  Input:
   *    hilightMarker:  the object that contains the place data for the marker
   *
   ****************************************************************************/

  handleMouseOut = (hilightMarker) => {
    // Determine if the marker receiving the mouseOut event has been selected
    // or if it is hilighted
    //
    //   If selected, then keep marker icon set for selectedMarker
    //   If marker is not selected, then set marker icon back to the
    //       unselected marker (standardMarker)
    //

    hilightMarker.markerPin === this.state.selectedMarker ?
      this.setMarkerIcon (hilightMarker.id, this.state.selectedMarker)
      : this.setMarkerIcon (hilightMarker.id, this.state.standardMarker);
  }

  /*****************************************************************************
   *
   *  The handleMouseOver function is the callback to handle when the user
   *  mouse moves onto a marker on the map.
   *
   *  Input:
   *    hilightMarker:  the object that contains the place data for the marker
   *
   ****************************************************************************/

  handleMouseOver = (hilightMarker) => {
    // Determine if the marker receiving the mouseOver event has been selected
    //
    //   If selected, then keep marker icon set for selectedMarker
    //  If marker is not selected, then set marker icon to the hovered marker
    //      icon (hoverMarker)
    //
    (hilightMarker.markerPin === this.state.selectedMarker) ?
      this.setMarkerIcon (hilightMarker.id, this.state.selectedMarker)
      : this.setMarkerIcon (hilightMarker.id, this.state.hoverMarker);
  }

  /*****************************************************************************
   *
   *  The handleOnClick function is the callback to handle when the user clicks
   *  on a marker.  It is also called when the user clicks on a line item in
   *  the places list
   *
   ****************************************************************************/

  handleOnClick = (event, clickedMarker) => {

    if (clickedMarker) {
      let activeMarkerID = this.state.activeMarker;
      // Determine if this marker is selected//
      if (clickedMarker.id === activeMarkerID) {
        // unselect this marker and reset activeMarkerID state to none
        activeMarkerID = -1;
        this.setMarkerIcon (clickedMarker.id, this.state.standardMarker);
      } else {
        // if there is a selected marker, then unselect it
        if (activeMarkerID >= 0) {
          this.setMarkerIcon (activeMarkerID, this.state.standardMarker);}
        // save the clicked marker as the active marker
        this.setMarkerIcon (clickedMarker.id, this.state.selectedMarker);
        activeMarkerID = clickedMarker.id;
      }
      // set the state to re-render the map
      this.setState ({activeMarker: activeMarkerID});
    }
  }

  /*****************************************************************************
   *
   *  The setMarkerIcon function will update a place's marker, based on the
   *  marker Icon parameter.
   *
   *  Input:
   *    markerToUpdateID - the placeID of the marker to be updated
   *    markerIcon - the icon to set the marker to
   *
   ****************************************************************************/


  setMarkerIcon = (markerToUpdateID, markerIcon) => {

    // get all of the markers currently being shown on the map

    let newMarkers = this.state.markers.map (marker => {
      return marker;});

    // find the index of the marker to be updated, based on the marker ID

    let xMarksTheSpot = newMarkers.findIndex (marker => marker.id === markerToUpdateID);

    // set the new icon, and update the state to re-render the map

    newMarkers[xMarksTheSpot].markerPin = markerIcon;
    this.setState({markers: newMarkers});
  }

  /******************************************************************************
   *  The setMarkers function sets up the markers array based on which places
   *  are marked to be shown on the map.
   *
   *  Input:
   *    showAll - Boolean.
   *              If true, reset the markers array to show all places.
   *              If false, only set the markers array to include items that have
   *                  been marked to show.
   *
   ****************************************************************************/

  setMarkers = (showAll) => {
    let myPlaces = this.state.myPlaces;
    let markers = [];

    showAll ?
      markers =
        myPlaces.map (place => {
          place.markerPin = this.state.standardMarker;
          return place;
        })
      :
      markers =
        myPlaces
          .filter  ( place => {
            return place.showPlace === true;
          })
          .map (place => {
            place.markerPin = this.state.standardMarker;
            return place;
          });

    // set state for the markers array.  This will cause the map to re-render,
    // and show the markers that have been requested to be shown

    this.setState ({ markers: markers });
  };

  /*****************************************************************************
   *
   *  The setShowAllMyPlaces function will reset the entire myPlaces array to
   *  either show or not show, depending on the input value.  It also resets the
   *  markers array
   *
   ****************************************************************************/

  setShowAllMyPlaces = (value) => {
    let myPlaces = this.state.myPlaces;
    myPlaces.map ( place => {
      place.showPlace = value;
      return place;}
    );
    this.setState ({myPlaces});
    this.setMarkers (true);
  };

  /*****************************************************************************
   *
   *  The setShowMyPlacesFromQuery function searches through the place name for
   *  any place that contains the search string.
   *
   ****************************************************************************/

  setShowMyPlacesFromQuery = (searchFor) => {

    let myPlaces = this.state.myPlaces;
    this.setShowAllMyPlaces (false);

    // get list of places that match the query

    let foundPlaces = myPlaces
      .filter ( place => {
        return place.name.indexOf (searchFor) > -1;
      });

    // set each place to show / hide values

    if (foundPlaces.length > 0) {

      myPlaces.map (place => {
        let xMarksTheSpot = foundPlaces.findIndex (foundPlace => foundPlace.id === place.id);
        return (
          place.showPlace = xMarksTheSpot >= 0
        );
      });
    }

    // set markers to only show those with showPlace = True

    this.setMarkers (false);

    // set state to re-render screen

    this.setState ({myPlaces});
  }

  /*****************************************************************************
   *
   *  The toggleOptions function toggles the showSideBar state variable to
   *  either hide or show the side bar.
   *
   ****************************************************************************/

  toggleOptions = () => {
    this.setState({showSideBar: !this.state.showSideBar});
  }

  /*****************************************************************************
   *
   *  The updateQuery function takes the search query that is input and updates
   *  the marker array based on the results of the query.
   *
   ****************************************************************************/


  updateQuery = (searchQuery) => {

    //  If search query is not empty, search for capmgrounds.
    //  If search returns data, then update MyPlaces.showPlace.
    //  If search does not return any data then hide all isMarkerShown = false
    //  If search query is empty, then set isMarkerShown = true for all

    this.setState({searchQuery});

    searchQuery ?
      this.setShowMyPlacesFromQuery (searchQuery) :
      this.setShowAllMyPlaces (true);

  }

  // Render the screen

  render() {

    let place = (this.state.activeMarker >= 0) ?
      this.state.myPlaces[this.findIdIndex (this.state.myPlaces, this.state.activeMarker)] : {};

    return (
      <Route exact path="/"  render={() => (
        <div>

          { /* show the header */}

          <Header
            showSideBar = {this.state.showSideBar}
            toggleOptions = {this.toggleOptions}
          />
          <div className = "container">

            { /* Show or hide the sidebar based on state value of showSideBar*/ }

            <aside className = {`options-box ${this.state.showSideBar? 'options-box-open' : 'options-box-closed'}`}>
              <h2> Campsite Information </h2>
              <div>

                { /* Show the search bar */ }

                <Search
                  updateQuery = {this.updateQuery}
                  searchQuery = {this.state.searchQuery}
                />
              </div>
              <div>

                { /* Show the list of places */ }

                <Places
                  myPlaces = {this.state.myPlaces}
                  handleListClick = {this.handleListClick}
                  showSideBar = {this.state.showSideBar}
                />
              </div>
              <div>

                { /* Show the site details */ }

                <SiteDetails
                  key={'sb'+place.id}
                  place={place}
                  mapCenter={this.state.defaultCenter}
                  isInfoBox={false}
                  activeMarkerID={this.state.activeMarker}
                />

              </div>
            </aside>

            { /* Show the map */}

            <div className='map'>

              { /* if Online, then show active, online Google Map */}

              <Online>
                <Map
                  markers = {this.state.markers}
                  handleOnClick = {this.handleOnClick}
                  handleMouseOver = {this.handleMouseOver}
                  handleMouseOut = {this.handleMouseOut}
                  closeInfoBox = {this.closeInfoBox}
                  selectedMarker = {this.state.selectedMarker}
                  mapCenter = {this.state.defaultCenter}
                  showSideBar = {this.state.showSideBar}
                  activeMarkerID = {this.state.activeMarker}
                />
              </Online>

              {/* If offline, then show the offline map and message */ }

              <Offline>
                <div
                  className={'offline-map'}
                  aria-label={'Offline Map of Land Between the Lakes'}
                  tabIndex={0}
                >
                  <div
                    className={'offline-div'}
                    tabIndex={0}>
                    <h3>Your interactive map is not available in off-line mode</h3>
                    <p> Please check your internet connection </p>
                  </div>
                </div>
              </Offline>

            </div>
          </div>
        </div>
      )}/>

    );
  }
}

export default App;
