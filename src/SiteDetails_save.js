import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class SiteDetails extends Component {

  static propTypes = {
    place: PropTypes.object.isRequired,
    mapCenter: PropTypes.object.isRequired,
  }

  state = {
    flickrAPIKey: '81681c8d34bd8f7da8994a9664dac8cb',
    flickrAPISecret: 'a76ac0da7275f958',
    flickrGroup: '1167677%40N21',
    flickrURL: '',
    flickrPics: [],

  }

  componentWillMount () {
    this.getFlickrPic ();
  }

  componentDidMount () {

  }

  getPics = (place, targeted) => {
    let picArray = [];
    let FlickrSearch = targeted ?
      'https://api.flickr.com/services/rest/' +
        '?method=flickr.photos.search' +
        '&api_key=' + this.state.flickrAPIKey +
        '&safe_search=1' +
        '&content_type=1' +
        '&privacy_filter=1' +
        '&lat=' + place.location.lat +
        '&lon=' + place.location.lng +
        '&radius=1' +
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
    fetch(FlickrSearch)
      .then(function(response){
        return response.json();
      })
      .then(function(pictures){
        picArray = pictures.photos.photo.map((pic) => {
          return (pic);
        });
        console.log ('in fetch, picArray = ' + picArray);
      }.bind(this));
    return picArray;
  }

  getFlickrPic = () => {
    let place = this.props.place;
    let targetedSearch = true;
    let generalSearch = false;

    let sitePics = this.getPics(place, targetedSearch);
    Promise.all (sitePics)
      .then (() => {
        if (sitePics.length <= 0) {
          sitePics = this.getPics(place, generalSearch);
          Promise.all (sitePics)
            .then(() => {
              this.setState({flickrPics: sitePics});
            });
        } else {
          this.setState({flickrPics: sitePics});
        }
      }
      );
    let pic = this.state.flickrPics.length > 0?
      (this.state.flickrPics[Math.floor(Math.random() * this.state.flickrPics.length)] ) :
      '';
    console.log ('pic = ' + pic);
    let flickrURL = pic ?
      'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg' :
      'image-not-available.jpg';
    this.setState ({flickrURL: flickrURL});
    console.log ('flickrURL = ' + flickrURL);
  }

  render() {
    let place = this.props.place;
    return (
      <div className="info-box" tabIndex="0" >
        <h3> {place.name} </h3>
        <div> Helpful links:
          <ul
            title = "place.name"
            className="info-contents" >
            <li>
              <a href = {place.link} target = "blank"> {place.name + ' ' + place.category }</a>
            </li>
            <li>
              <a href = "https://www.landbetweenthelakes.us/seendo/camping/" target = "blank">Camping at Land Between the Lakes</a>
            </li>
          </ul>
          <img className = "info-box-image" src={this.state.flickrURL} alt={place.name}/>
        </div>
      </div>

    );
  }
}

export default SiteDetails;
