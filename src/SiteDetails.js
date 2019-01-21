import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {Online, Offline} from 'react-detect-offline';

class SiteDetails extends Component {

  static propTypes = {
    place: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
    isInfoBox: PropTypes.bool.isRequired,
  }

  state = {
    flickrAPIKey: '81681c8d34bd8f7da8994a9664dac8cb',
    flickrAPISecret: 'a76ac0da7275f958',
    flickrURL: '',
    flickrTitle: '',
    flickrNotFound: 'image-not-available.jpg',
    flickrArray: [],
    offlineImage: '/images/BisonAtLBL.png',
  }

  componentDidMount () {
    this.getFlickrPic ();
  }

  setSearch = (place, targeted) => {
    return targeted ?
      'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.search' +
        '&api_key=' + this.state.flickrAPIKey +
        '&safe_search=1' +
        '&content_type=1' +
        '&privacy_filter=1' +
        '&lat=' + place.location.lat +
        '&lon=' + place.location.lng +
        '&radius=1.5' +
        '&radius_units=m' +
        '&format=json' +
        '&nojsoncallback=1'

      :

      'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.search' +
        '&api_key=' + this.state.flickrAPIKey +
        '&safe_search=1' +
        '&content_type=1' +
        '&privacy_filter=1' +
        '&lat=' + this.props.mapCenter.lat +
        '&lon=' + this.props.mapCenter.lng +
        '&group_id=' + this.state.flickrGroup +
        '&radius=10' +
        '&radius_units=m' +
        '&format=json' +
        '&nojsoncallback=1';
  }

  fetchFlickr = (searchQuery) => {
    let picArray = [];
    let flickrURL = '';
    let flickrTitle = '';
    if (navigator.onLine) {

      fetch (searchQuery)
        .then(function(response){
          return response.json();
        })

        .then(function(pictures){
          picArray = pictures.photos.photo.map((pic) => {
            return (pic);
          });
          if (picArray.length > 0) {
            let pic = picArray[Math.floor(Math.random() * picArray.length)];
            flickrURL = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
            flickrTitle = this.props.place.name + ':' + pic.title;
          } else {
            flickrURL = this.state.flickrNotFound;
            flickrTitle = this.props.place.name;
          }
          this.setState ({
            flickrURL: flickrURL,
            flickrTitle: flickrTitle
          });
        }.bind(this))
        .catch (error => {console.warn (error);});
    } else {
      this.setState ({
        flickrURL: this.state.flickrNotFound,
        flickrTitle: this.props.place.name
      });
    }

  }
  getFlickrPic = () => {
    let place = this.props.place;
    let targetedSearch = true;
    //let generalSearch = false;

    this.fetchFlickr ( this.setSearch(place, targetedSearch));

    /*if (this.state.flickrURL === this.state.flickrNotFound) {
      this.fetchFlickr (this.setSearch(place, generalSearch));}

    fetch(this.setSearch(place, targetedSearch))
      .then(function(response){
        return response.json();
      })
      .then(function(pictures){
        picArray = pictures.photos.photo.map((pic) => {
          return (pic);
        });
        if (picArray.length > 0) {
          let pic = picArray[Math.floor(Math.random() * picArray.length)];
          flickrURL = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        } else {
          flickrURL = 'image-not-available.jpg';
        }
        this.setState ({flickrURL: flickrURL});
      }.bind(this)); */
  };

  render() {
    let place = this.props.place;
    let className = ['info-box ', this.props.isInfoBox ? 'info-box-details' : 'options-box-details' ];
    return (

      <div className={className} tabIndex="0" >
        <h3> {place.name} </h3>
        <ul
          title = "place.name"
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

export default SiteDetails;
