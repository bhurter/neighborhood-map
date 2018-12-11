import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyMap from './MyMap';
import './App.css';

class App extends Component {



  componentDidMount() {

  }

  render() {
    return (
      <div>

        <div className = "options-box">
          <h1> Land Between the Lakes </h1>
          <h2> Camp Sites </h2>
          <div>
            <p> stuff goes here </p>
          </div>
        </div>
        <Route exact path="/"  render={() => (

          <MyMap

          />

        )}/>

      </div>
    );
  }
}

export default App;
