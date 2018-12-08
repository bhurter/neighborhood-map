import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

class MyMap extends Component {

  static propTypes = {
    myAPIKey: PropTypes.string.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
  }


  componentDidMount() {

  }

  render() {
    return (
      <div id='map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.myAPIKey }}
          defaultCenter={this.props.mapCenter}
          defaultZoom={this.props.mapZoom}
        />
      </div>
    );
  }
}

export default MyMap;
