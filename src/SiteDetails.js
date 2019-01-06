import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class SiteDetails extends Component {

  static propTypes = {
    place: PropTypes.object.isRequired,
  }

  state = {
    flickrAPIKey: '81681c8d34bd8f7da8994a9664dac8cb',
    flickrAPISecret: 'a76ac0da7275f958',
    flickrURL: '',
  }

  componentDidMount () {
    this.getFlickrPic ();
  }

  getFlickrPic = () => {
    let place = this.props.place;
    let flickrURL = 'not set';
    let FlickrAPISearch = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
      this.state.flickrAPIKey
      + '&safe_search=1&content_type=1&lat=' +
      place.location.lat
      + '&lon=' +
      place.location.lng
      +'&radius=1&radius_units=m&format=json&nojsoncallback=1';
    fetch(FlickrAPISearch)
      .then(function(response){
        return response.json();
      })
      .then(function(pictures){
        let picArray = pictures.photos.photo.map((pic) => {
          return (pic);
        });
        let pic = picArray[Math.floor(Math.random() * picArray.length)];

        flickrURL = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        this.setState ({flickrURL: flickrURL});
      }.bind(this));
  };

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
