import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  state = {
    MyAPIKey: "AIzaSyD_bssLI2jNVYRV4wjBSwCw8UDefqscOZM"
  };

  componentDidMount() {

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Neighborhood Maps</h1>
        </header>
      </div>

      { /*Set up the route for the main page:  BookCase */ }

      <Route exact path="/"  render={() => (
        <div>

        </div>
      )}/>
    );
  }
}

export default App;
