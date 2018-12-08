import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyMap from './MyMap';
import './App.css';

class App extends Component {

  state = {
    myAPIKey: 'AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM',
    mapCenter: {lat: 34.895990, lng: -86.646450},
    mapZoom: 15
  };

  componentDidMount() {

  }

  render() {
    return (
      <body>
        <div>
          <Route exact path="/"  render={() => (
            <div>
              <div class="container">
                <div class="options-box">
                  <h1>USA National Parks</h1>
                  <div>
                    <p> stuff goes here </p>
                  </div>
                </div>
              </div>
              <div>
                <MyMap
                  myAPIKey = {this.state.myAPIKey}
                  mapCenter = {this.state.mapCenter}
                  mapZoom = {this.state.mapZoom}
                />
              </div>
            </div>
          )}/>
        </div>
      </body>





    );
  }
}

export default App;
