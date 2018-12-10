import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyMarker extends Component {

  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    text: PropTypes.string,
  }


  componentDidMount() {

  }

  render() {

    return (
      <div>
        {this.props.text}
      </div>
    );
  }
}

export default MyMarker;
