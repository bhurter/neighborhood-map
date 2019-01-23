import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import SiteDetails from './SiteDetails';
import { compose, withProps } from 'recompose';
import './App.css';

/*******************************************************************************
 *
 *  The MyMap component uses react-google-maps  by Tom Chen to render the
 *  Google Maps.  This implementation follows the example provided by Tom Chen,
 *  including the use of recompose.
 *
 ******************************************************************************/

export const MyMap = compose (

  // Set up the GoogleMap properties.  googleMapURO includes the API Key

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

  // set up the google map Component.

    <GoogleMap
      defaultCenter={props.mapCenter}
      defaultZoom={9.5}
      scrollwheel={false}
      zoomControl={true}
    >
      { /* set up the map markers */ }

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
              activeMarkerID={props.activeMarkerID}

              onTilesLoaded={()=>{
                let map = document.querySelector('iframe');
                map.setAttribute('title','Google Map of Land Between The Lakes Campgrounds');
              }}

            >

              { /* Only show infoBox on map if the user is not showing the side bar */ }

              {(place.markerPin === props.selectedMarker) && !props.showSideBar &&  (

                <InfoBox
                  onCloseClick={ (event) => props.closeInfoBox(event, place)}
                  tabIndex={0}
                >
                  <SiteDetails
                    key={'map'+place.id}
                    place={place}
                    mapCenter={props.mapCenter}
                    isInfoBox={true}
                    activeMarkerID={props.activeMarkerID}
                  >
                  </SiteDetails>
                </InfoBox>)}
            </Marker>

          );})
      }
    </GoogleMap>
  );
});
