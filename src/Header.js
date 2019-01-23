import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

  /*****************************************************************************
   *
   *  The Header component displays the header on the map page
   *
   *  Properties:
   *    showSideBar   Indicates whether or not to show the side bar
   *    toggleOptions Function to call when the user clicks the show/hide button
   *
   ****************************************************************************/

  static propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    toggleOptions: PropTypes.func.isRequired,
  }

  // Render the Header.
  // include the button to toggle the sidebar on and off, and the main screen title

  render() {
    return(
      <header className="header">

        { /* Set the button icon transformation based on whether the sidebar is open or closed */ }

        <button
          className= {`options-button ${this.props.showSideBar ? 'options-button-open' : 'options-button-close'}`}
          alt={`${this.props.showSideBar ? 'Hide sidebar' : 'Show sidebar'}`}
          onClick={this.props.toggleOptions}
        />

        <h1 className="main-title">Camping at Land Between the Lakes</h1>

      </header>
    );
  }
}

export default Header;
