import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

  /*****************************************************************************
   *
   *  The Search component manages the search field and sets each place to
   *  show or hide based on the contents of the search query
   *
   ****************************************************************************/

  static propTypes = {
    updateQuery: PropTypes.func.isRequired,               // function to call when query is updated
    searchQuery: PropTypes.string.isRequired,             // the current query that is in the search box
  }

  render() {

    //  create the div and input field for the search query, and set callback
    //  to handle changes in query value

    return (
      <div className = 'search-input-wrapper'>
        <input
          type = 'text'
          placeholder = 'search for campground'
          value = {this.props.searchQuery}
          onChange = {(event) => this.props.updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default Search;
