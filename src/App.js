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
            <ol>SideBar
              <li>Add list of campgrounds</li>
              <li>Add search for campground</li>
              <li>Filter campgrounds by category</li>
              <li>Hide markers for campgrounds that do not meet search or filter</li>
              <li>Change marker color and show infobox when campground selected from list</li>
              <li>call camping api and display details when campground selected from list </li>
              <li>show/hide sidebar</li>
            </ol>
            <ol>Map
              <li>Change pin color on hover </li>
              <li>change pin color on click </li>
              <li>show infobox on marker click</li>
              <li>select campground on list (and camping api details) </li>
            </ol>
            <a href="https://review.udacity.com/#!/rubrics/1351/view">Neighborhood Project Ruberic</a>
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
