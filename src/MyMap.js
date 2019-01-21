import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import SiteDetails from './SiteDetails';
import { compose, withProps } from 'recompose';
import './App.css';


export const MyMap = compose (
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),

  withScriptjs,
  withGoogleMap,

)((props) => {
  return (

    <GoogleMap
      defaultCenter={props.mapCenter}
      defaultZoom={9.5}
      scrollwheel={false}
      zoomControl={true}
    >
      { props.markers
        .map (place => {
          return (

            <Marker
              key={place.id}
              position={place.location}
              icon = {place.markerPin}
              title= { place.name }
              defaultAnimation={2}
              onClick = { (event) => props.handleOnClick (event, place)}
              onKeyUp = { (event) => props.handleOnClick (event, place)}
              onMouseOver = { () => props.handleMouseOver (place)}
              onMouseOut = { () => props.handleMouseOut (place)}
              tabIndex={0}
              onTilesLoaded={()=>{
                let map = document.querySelector('iframe');
                map.setAttribute('title','Google Map of Land Between The Lakes Campgrounds');
              }}
            >
              {(place.markerPin === props.selectedMarker) && !props.showSideBar &&  (
                <InfoBox
                  onCloseClick={ (event) => props.closeInfoBox(event, place)}
                  tabIndex={0}
                >
                  <SiteDetails
                    place={place}
                    mapCenter={props.mapCenter}
                    isInfoBox={true}
                  >
                  </SiteDetails>
                </InfoBox>)}
            </Marker>

          );})
      }
    </GoogleMap>
  );
});

/*
class MyMap extends Component {

  state = {
    isMarkerShown: true,
    animation: 2,
  }

  componentDidMount() {

  }

  render() {

    return (
      <div id='map' style={{ height: '100%', width: '100%' }}>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM'}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        >
        </MyMapComponent>

      </div>
    );
  }
}


export default MyMap; */
