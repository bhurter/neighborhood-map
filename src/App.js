import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import {Online, Offline} from 'react-detect-offline';


import { MyMap } from './MyMap';
import Header from './Header';
import MyPlaces from './MyPlaces';
import MySearch from './MySearch';
import SiteDetails from './SiteDetails';
import Campgrounds from './data/lbl-campsites';
import './App.css';

class App extends Component {

state = {
  myPlaces: [],                     // array of interesting places.
  searchQuery: '',                  // current query in the search box
  markers: [],                      // array of markers to be shown on the map
  selectedMarker:'pink-pin.png',    // icon for the selected marker
  standardMarker: 'blue-pin.png',   // icon for the un-selected marker
  hoverMarker: 'yellow-pin.png',    // icon to show when hovering over a marker
  activeMarker: -1,                 // id of the currently selected marker
  showSideBar: true,                // indicates whether or not the sidebar is visible
  defaultCenter: {                  // default map center
    lat: 36.7856242,
    lng: -88.0329686}
}



componentDidMount() {

  /* Load the campground data */
  let campgrounds =  Campgrounds.map (campground => {
    return campground;
  });

  /* Sort the list of campgrounds alphabetically */
  campgrounds.sort(sortBy('name'));

  /* save the interesting places and list of current markers in the current state */

  this.setState({
    myPlaces: campgrounds,
    markers: campgrounds});
}

  closeInfoBox = (event, infoBoxMarker) => {
    this.handleOnClick (event, infoBoxMarker);
  };


  handleListClick = (event, clickedItem) => {
    this.handleOnClick (event, clickedItem);
  }


  handleMouseOut = (hilightMarker) => {
    hilightMarker.markerPin === this.state.selectedMarker ?
      this.setMarkerIcon (hilightMarker.id, this.state.selectedMarker)
      : this.setMarkerIcon (hilightMarker.id, this.state.standardMarker);
  }

  handleMouseOver = (hilightMarker) => {
    (hilightMarker.markerPin === this.state.selectedMarker) ?
      this.setMarkerIcon (hilightMarker.id, this.state.selectedMarker)
      : this.setMarkerIcon (hilightMarker.id, this.state.hoverMarker);
  }

  handleOnClick = (event, clickedMarker) => {

    if (clickedMarker) {
      /* Determine if this marker is selected.
          If so, then
            unselect  this marker
            reset activeMarkerID to none selected
          If not, then
            unselect selected marker (if any)
            set this marker to selected
            save as active Marker*/
      let activeMarkerID = this.state.activeMarker;
      if (clickedMarker.id === activeMarkerID) {
        /* unselect this marker and reset activeMarkerID state to none */
        activeMarkerID = -1;
        this.setMarkerIcon (clickedMarker.id, this.state.standardMarker);
      } else {
        if (activeMarkerID >= 0) {
          this.setMarkerIcon (activeMarkerID, this.state.standardMarker);}
        this.setMarkerIcon (clickedMarker.id, this.state.selectedMarker);
        activeMarkerID = clickedMarker.id;
      }
      this.setState ({activeMarker: activeMarkerID});
    }
  }

  setMarkerIcon = (markerToUpdateID, markerIcon) => {
    let newMarkers = this.state.markers.map (marker => {
      return marker;});
    let xMarksTheSpot = newMarkers.findIndex (marker => marker.id === markerToUpdateID);
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
   *****************************************************************************/

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

      /*  set state for the markers array.  This will cause the map to re-render,
       *  and only show the markers that have been requested to be shown
       */
      this.setState ({ markers: markers });
    };

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
    this.setState ({myPlaces});
  }

  toggleOptions = () => {
    this.setState({showSideBar: !this.state.showSideBar});
  }

  updateQuery = (searchQuery) => {

    /*
      If search query is not empty, search for capmgrounds.
      If search returns data, then update MyPlaces.showPlace.
      If search does not return any data then hide all isMarkerShown = false
      If search query is empty, then set isMarkerShown = true for all
    */

    this.setState({searchQuery});
    searchQuery ?
      this.setShowMyPlacesFromQuery (searchQuery) :
      this.setShowAllMyPlaces (true);

  }


  render() {

    return (
      <Route exact path="/"  render={() => (
        <div>
          <Header
            showSideBar = {this.state.showSideBar}
            toggleOptions = {this.toggleOptions}
          />
          <div className = "container">
            { /* <div className = "toggle-menu">

              <button
                onClick={ this.toggleOptions }
                className= {`options-button ${this.state.showSideBar ? 'options-button-open' : 'options-button-close'}`}
              >
                {this.state.showSideBar? 'Hide': 'Show'}
              </button>
            </div> */ }
            <div className = {`options-box ${this.state.showSideBar? 'options-box-open' : 'options-box-closed'}`}>
              <h2> Campsite Information </h2>
              <div>
                <MySearch
                  myPlaces = {this.state.myPlaces}
                  setShowAllMyPlaces = {this.setShowAllMyPlaces}
                  setShowMyPlacesFromQuery = {this.setShowMyPlacesFromQuery}
                  updateQuery = {this.updateQuery}
                  searchQuery = {this.state.searchQuery}
                />
              </div>
              <div>
                <MyPlaces
                  myPlaces = {this.state.myPlaces}
                  handleListClick = {this.handleListClick}
                  showSideBar = {this.state.showSideBar}
                />
              </div>
              <div>
                {this.state.myPlaces
                  .filter ( place => {
                    return place.markerPin === this.state.selectedMarker;
                  })

                  .map (place => {
                    return (
                      <SiteDetails
                        key={'sb'+place.id}
                        place={place}
                        mapCenter={this.state.defaultCenter}
                        isInfoBox={false}
                      />
                    );
                  })
                }
              </div>
            </div>

            <div className='map'>

              <Online>
                <MyMap
                  markers = {this.state.markers}
                  myPlaces = {this.state.myPlaces}
                  handleOnClick = {this.handleOnClick}
                  handleMouseOver = {this.handleMouseOver}
                  handleMouseOut = {this.handleMouseOut}
                  closeInfoBox = {this.closeInfoBox}
                  selectedMarker = {this.state.selectedMarker}
                  mapCenter = {this.state.defaultCenter}
                  showSideBar = {this.state.showSideBar}
                />
              </Online>

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
