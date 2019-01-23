import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {Online, Offline} from 'react-detect-offline';

class SiteDetails extends Component {

  /*****************************************************************************
   *
   *  The SiteDetails component manages the rendering of the site Details
   *  within both the infoBox and in the sidebar.
   *
   *  If there is a marker selected (either from the map or the list box),
   *  it displays the place name, some standard helpful links, and an image
   *  that is retrieved from the Flickr API.
   *
   *  If there is not a marker selected, then the SiteDetails renders instructions
   *  for the user, the default helpful links, and the default image.
   *
   *  If the browser is offline, then it displays the standard information and
   *  a default picture.
   *
   ****************************************************************************/

  static propTypes = {
    place: PropTypes.object.isRequired,       //  the place for which to display details
    mapCenter: PropTypes.object.isRequired,   //  the map mapCenter
    isInfoBox: PropTypes.bool.isRequired,     //  indicates whether to display details in the infoBox or side bar
    activeMarkerID: PropTypes.number,         //  ID of the active marker
  }

  state = {
    flickrAPIKey: '81681c8d34bd8f7da8994a9664dac8cb',   // flickr API key
    flickrAPISecret: 'a76ac0da7275f958',                // flickr API secret
    flickrURL: '',                                      // flickr URL - holds the API call
    flickrTitle: '',                                    // title of the image
    flickrNotFound: '/images/image-not-available.jpg',          // image to use if nothing is returned from flickr API
    flickrGroup: '1339214@N20',                         // group_id
    offlineImage: '/images/BisonAtLBL.png',             // image to use in place of flickr image when browser is offline
  }

  componentDidMount () {

    // indicate that component is mounted and if there is an activeMarkerID,
    // then get an image from Flickr

    this.mounted = true;
    /*
    if (this.props.activeMarkerID >= 0) {
      this.getFlickrPic ();
    }*/
    this.getFlickrPic ();
  }

  componentWillUnMount () {

    // indicate component is not mounted

    this.mounted = false;
  }

  /*****************************************************************************
   *
   * fetchFlickr manages the call to the flickerAPI and sets the image URL and
   * image title for a random picture in the result set when the browser is
   * online and the component is mounted.
   *
   * If the browser is not online or the component is not mounted, then fetchFlickr
   * returns the default "Photo not found" image.
   ****************************************************************************/
  fetchFlickr = (searchQuery) => {
    let picArray = [];
    let flickrURL = '';
    let flickrTitle = '';

    // make sure we are online and the component is mounted

    if (navigator.onLine && this.mounted) {

      // fetch the JSON response based on the searchQuery passed in

      fetch (searchQuery)

      // get the JSON

        .then(function(response){
          return response.json();
        })

      // parse the picture objects into an array

        .then(function(pictures){
          picArray = pictures.photos.photo.map((pic) => {
            return (pic);
          });

          // make sure we have pictures

          if (picArray.length > 0) {

            // get a random picture from the picArray

            let pic = picArray[Math.floor(Math.random() * picArray.length)];

            // set the URL and image title

            flickrURL = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
            flickrTitle = this.props.place.name + ':' + pic.title;
          } else {

            //
            flickrURL = this.state.flickrNotFound;
            flickrTitle = this.props.place.name;
          }

          // set the state

          this.setState ({
            flickrURL: flickrURL,
            flickrTitle: flickrTitle
          });

          // bind the results

        }.bind(this))

      // error processing

        .catch (error => {console.warn (error);});

      // we are offline, so let's check to see if we are mounted

    } else if (this.mounted){
      this.setState ({
        flickrURL: this.state.flickrNotFound,
        flickrTitle: this.props.place.name
      });
    }

  }

  /*****************************************************************************
   * getFlickrPic manages setting the searchQuery and  calling the Flickr API
   ****************************************************************************/

  getFlickrPic = () => {

    let place = this.props.place;

    // if there is an active marker, use a targeted search (1.5 mile radius).
    // if there is not an active marker, use a larger search within the group
    // (20 mile radius)

    let targetedSearch = (this.props.activeMarkerID >= 0);

    // get the data

    this.fetchFlickr ( this.setSearch(place, targetedSearch));

  };


  /*****************************************************************************
   *
   * setSearch sets up the search string, based on whether the image should come
   * from a targeted search (the user has selected a place from the map or the
   * list) or a general search (there is no active placeID, but still want to
   * show generic pictures within a radius of the center of the map)
   *
   ****************************************************************************/

  setSearch = (place, targeted) => {

    let lat;
    let lon;
    if (place) {
      lat = targeted ? place.location.lat : this.props.mapCenter.lat;
      lon = targeted ? place.location.lng : this.props.mapCenter.lng;
    }

    let radius = targeted ? 1.5 : 20;

    let searchString =
      'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.search' +
        '&api_key=' + this.state.flickrAPIKey +
        '&safe_search=1' +
        '&content_type=1' +
        '&privacy_filter=1' +
        '&lat=' + lat +
        '&lon=' + lon +
        '&radius=' + radius +
        '&radius_units=m' +
        '&format=json' +
        '&nojsoncallback=1';

    return targeted ?
      searchString :
      searchString + '&group_id=' + this.state.flickrGroup;

  }

  render() {

    let place = this.props.place;

    // set the className depending on whether we are displaying in the infobox or in the sidebar

    let className = ['info-box ', this.props.isInfoBox ? 'info-box-details' : 'options-box-details' ];

    // if there is a value in activeMarkerID prop, then use it for activemarkerID.  Else, set to -1 (no active marker)

    let activeMarkerID = this.props.activeMarkerID ? this.props.activeMarkerID : -1;

    // if no active marker, then give user instructions to find campsite Details

    if (activeMarkerID < 0) {
      return (
        <div className= {className} tabIndex="0">
          <h3>Campsite Details</h3>
          <p>
            To view details about a campsite, please select a marker from the Google Map, or select a campsite from the list above
          </p>

          <Online>
            <p>
              <a href = "https://www.landbetweenthelakes.us/seendo/camping/" target = "blank">Camping at Land Between the Lakes</a>
            </p>
            <img className = "info-box-image" src={this.state.flickrURL} alt={this.state.flickrTitle}/>
          </Online>

          <Offline>
            <img className = "info-box-image" src={this.state.offlineImage} alt="Bison at LBL"/>
          </Offline>

        </div>
      );
    } else  {

      // if active marker, show place in infobox or sidebar

      return (
        <div className={className} tabIndex="0" >
          <h3> {place.name} </h3>
          <ul
            title = {place.name + ' ' + place.category + ' details'}
            className="info-contents" >Helpful Links:
            <li>
              <a href = {place.link} target = "blank"> {place.name + ' ' + place.category }</a>
            </li>
            <li>
              <a href = "https://www.landbetweenthelakes.us/seendo/camping/" target = "blank">Camping at Land Between the Lakes</a>
            </li>
          </ul>

          <Online>
            <img className = "info-box-image" src={this.state.flickrURL} alt={this.state.flickrTitle}/>
          </Online>

          <Offline>
            <img className = "info-box-image" src={this.state.offlineImage} alt="Bison at LBL"/>
          </Offline>
        </div>

      );
    }
  }
}

export default SiteDetails;
