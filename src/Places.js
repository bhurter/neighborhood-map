
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Places extends Component {

  /*****************************************************************************
   *
   *  The Places component renders the list of places in the sidebar
   *
   ****************************************************************************/

  static propTypes = {
    myPlaces: PropTypes.array.isRequired,         // the array of places
    handleListClick: PropTypes.func.isRequired,   // the function to manage a list click
    showSideBar: PropTypes.bool.isRequired,       // flags whether or not to show the sidebar
  }


  render() {
    let myPlaces = this.props.myPlaces;

    // set aria properties and tabIndex based on whether or not the sidebar is visible

    let ariaHidden = !this.props.showSideBar;
    let tabIndex = this.props.showSideBar ? 0 : -1;

    // create the ul, then add each place that is flagged to show as a li

    return (
      <ul
        title= 'Campgrounds in LBL'
        aria-label = 'Campgrounds in LBL'
        aria-hidden = {ariaHidden}
        tabIndex= {tabIndex}
        className = 'ul-scroll'
      >
        {myPlaces
          .filter ( place => {
            return place.showPlace === true;
          })

          .map(place => {
            return(
              <li
                key= {place.id}
                onClick = { (event) => this.props.handleListClick (event, place)}
                onKeyUp = { (event) => this.props.handleListClick (event, place)}
                className = 'li-myList li-normal'
                aria-label = {place.name}
                aria-hidden = {ariaHidden}
                tabIndex = {tabIndex}
              >{place.name}</li>
            );})}
      </ul>
    );
  }
}

export default Places;
