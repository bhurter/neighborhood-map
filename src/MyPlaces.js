
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyPlaces extends Component {

  static propTypes = {
    myPlaces: PropTypes.array.isRequired,
    handleListClick: PropTypes.func.isRequired,
    showSideBar: PropTypes.bool.isRequired,
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    let myPlaces = this.props.myPlaces;
    let ariaHidden = !this.props.showSideBar;
    let tabIndex = this.props.showSideBar ? 0 : -1;
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

export default MyPlaces;
