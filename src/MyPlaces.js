
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyPlaces extends Component {

  static propTypes = {
    myPlaces: PropTypes.array.isRequired,
    handleOnClick: PropTypes.func.isRequired,
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    let myPlaces = this.props.myPlaces;

    return (
      <ul
        title= 'Camp Sites'
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
                onClick = { (event) => this.props.handleOnClick (event, place)}
              >{place.name}</li>
            );})}
      </ul>
    );
  }
}

export default MyPlaces;
