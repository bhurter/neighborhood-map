import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import MyMarker from './MyMarkers';

class MyMap extends Component {

  static propTypes = {
    myAPIKey: PropTypes.string.isRequired,
    mapCenter: PropTypes.object.isRequired,
    mapZoom: PropTypes.number.isRequired,
    markerLocations: PropTypes.array.isRequired,
  }


  componentDidMount() {

  }

  render() {
    let markers = this.props.markerLocations;
    console.log (';markers = ' + markers);
    return (
      <div id='map' style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.myAPIKey }}
          defaultCenter={this.props.mapCenter}
          defaultZoom={this.props.mapZoom}
        >
          {markers.map (marker => (
            <MyMarker key= {marker.id}
              lat={marker.location.lat}
              lng={marker.location.lng}
              text={marker.name} />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}


export default MyMap;
