import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MySearch extends Component {


  static propTypes = {
    myPlaces: PropTypes.array.isRequired,
    setShowAllMyPlaces: PropTypes.func.isRequired,
    setShowMyPlacesFromQuery: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }

  state = {
    searchQuery: ''
  }

  componentDidMount() {

  }


  /*
    updateQuery = (searchQuery) => {


      //If search query is not empty, search for capmgrounds.
      //If search returns data, then update MyPlaces.showPlace.
      //If search does not return any data then hide all isMarkerShown = false
      //If search query is empty, then set isMarkerShown = true for all

      console.log ('in updateQuery - searchQuery = ' + searchQuery)
      this.setState({searchQuery});
      searchQuery ?
        this.props.setShowMyPlacesFromQuery (searchQuery) :
        this.props.setShowAllMyPlaces (true);

    }
  */

    render() {
      return (
        <div className = 'search-input=wrapper'>
          <input
            type = 'text'
            placeholder = 'search for campground'
            value = {this.props.searchQuery}
            onChange = {(event) => this.props.updateQuery(event.target.value)}
          />
        </div>
      );
    }
}

export default MySearch;
