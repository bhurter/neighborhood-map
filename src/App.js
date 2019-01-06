import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import sortBy from 'sort-by';
import {Online, Offline} from 'react-detect-offline';


import { MyMap } from './MyMap';
import MyPlaces from './MyPlaces';
import MySearch from './MySearch';
import SiteDetails from './SiteDetails';
import Campgrounds from './data/lbl-campsites';
import './App.css';

class App extends Component {

state = {
  myPlaces: [],
  searchQuery: '',
  markers: [],
  onClickURL:'pink-pin.png',
  markerURL: 'blue-pin.png',
  mouseOverURL: 'yellow-pin.png',
  showSideBar: true,

}

componentDidMount() {
  let campgrounds =  Campgrounds.map (campground => {
    return campground;
  });
  campgrounds.sort(sortBy('name'));
  this.setState({
    myPlaces: campgrounds,
    markers: campgrounds});
}


componentWillMount  ()  {
  let campgrounds =  Campgrounds.map (campground => {
    return campground;
  });
  campgrounds.sort(sortBy('name'));
  this.setState({
    myPlaces: campgrounds,
    markers: campgrounds});

}



  setMarkers = (showAll) => {
    let myPlaces = this.state.myPlaces;
    let markers = [];
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


    this.setState ({ markers: markers });
  };

  closeInfoBox = (infoBoxMarker) => {
    this.handleOnClick (infoBoxMarker);
  };

  handleOnClick = (clickedMarker) => {
    if (clickedMarker) {
      (clickedMarker.markerPin === this.state.onClickURL) ?
        this.setMarkerIcon (clickedMarker, this.state.markerURL)
        : this.setMarkerIcon (clickedMarker, this.state.onClickURL);
    }

  };

  handleMouseOver = (hilightMarker) => {
    (hilightMarker.markerPin === this.state.onClickURL) ?
      this.setMarkerIcon (hilightMarker, this.state.onClickURL)
      : this.setMarkerIcon (hilightMarker, this.state.mouseOverURL);
  }

  handleMouseOut = (hilightMarker) => {
    hilightMarker.markerPin === this.state.onClickURL ?
      this.setMarkerIcon (hilightMarker, this.state.onClickURL)
      : this.setMarkerIcon (hilightMarker, this.state.markerURL);
  }

  setMarkerIcon = (markerToUpdate, markerIcon) => {
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
          <div className = "container">
            <div className = "toggle-menu">
              <button
                onClick={ this.toggleOptions }
                className= {`options-button ${this.state.showSideBar ? 'options-button-open' : 'options-button-close'}`}
              >
                {this.state.showSideBar? 'Hide': 'Show'}
              </button>
            </div>
            <div className = {`options-box ${this.state.showSideBar? 'options-box-open' : 'options-box-closed'}`}>
              <h1> Land Between the Lakes </h1>
              <h2> Campgrounds </h2>
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
                  handleOnClick = {this.handleOnClick}
                />
              </div>
              <div>
                {this.state.myPlaces
                  .filter ( place => {
                    return place.markerPin === this.state.onClickURL;
                  })

                  .map (place => {
                    return (
                      <SiteDetails
                        key={'sb'+place.id}
                        place={place}
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
                  onClickURL = {this.state.onClickURL}
                />
              </Online>

              <Offline>
                <div className="offline-map">
                  <div className="offline-div">
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
