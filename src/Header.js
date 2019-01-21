import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

  static propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    toggleOptions: PropTypes.func.isRequired,
  }

  render() {
    return(
      <header className="header">
        <button
          className= {`options-button ${this.props.showSideBar ? 'options-button-open' : 'options-button-close'}`}
          alt={`${this.props.showSideBar ? 'Hide sidebar' : 'Show sidebar'}`}
          onClick={this.props.toggleOptions}
        />

        <h1 className="main-title">Campsites at Land Between the Lakes</h1>
      </header>
    );
  }
}

export default Header;
