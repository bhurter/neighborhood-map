# Neighborhood Map Project

 Author:  Beth Hurter
 Date:    January 23, 2019

 Udacity Front End Web Developer Nanodegree project

## Requirements:
Create a map application that allows the user to:
    1.  TBD

## Future Enhancements:
    1.  Continue to work on user interface for the list box so that the entire row is highlighted when selected
    2.  Highlight the row in the list box when a marker pin is selected
    3.  Enhance offline mode caching
    4.  Add ability to upload images to Flickr
    5.  Add ability to provide reviews of the Campgrounds
    6.  Look for API that will provide camping amenities and display as part of the site details.
    7.  Make search case insensitive

## Getting Started
    1.  Clone the repository or download the files
    2.  From the command line:
    3.  Change to the project directory/folder
    4.  Install project dependencies using `npm install`
    5.  Start the development server using `npm start`

## React NPM Dependencies
    1.  prop-types
    2.  react-detect-offline
    3.  react-google-maps
    4.  react-router-dom
    5.  recompose
    6.  sort-by

## APIs
    1.  All images except the default offline image courtesy of Flickr API
    2.  Map courtesy of Google Maps API and react-google-maps component

## React Components

### App
The App component is the main application.  It manages the rendering of the entire main page and manages state changes and user actions.

#### State
  myPlaces - array of interesting places.
  searchQuery - current query in the search box
  markers - array of markers to be shown on the map
  selectedMarker - icon for the selected marker - value: '/images/pink-pin.png'
  standardMarker - icon for the un-selected marker - value: '/images/blue-pin.png'
  hoverMarker - icon to show when hovering over a marker - value:  '/images/yellow-pin.png'
  activeMarker - id of the currently selected marker.  A value of -1 indicates no marker selected - initial value: -1
  showSideBar - indicates whether or not the sidebar is visible - initial value:  true
  defaultCenter - the default map center

### Header
The Header component displays the header on the map page

#### Props:
  showSideBar   Indicates whether or not to show the side bar
  toggleOptions Function to call when the user clicks the show/hide button

### Map
The Map component uses react-google-maps  by Tom Chen to render the Google Maps.  This implementation follows the example provided by Tom Chen, including the use of recompose.

#### Props:
  markers - the array of markers to display
  handleOnClick - callback function to manage user click on markers
  handleMouseOver - callback function to manage mouse over on markers
  handleMouseOut - callback function to manage mouse out on markers
  closeInfoBox - callback function to manage the user click on the close infoBox icon
  selectedMarker - the selected marker
  mapCenter - the location of the map center.  Includes lat and lng
  showSideBar - boolean to indicate whether or not to show the side bar
  activeMarkerID - the ID of the active marker.  May differ from the selected Marker

### Places
The Places component renders the list of places in the sidebar

#### Props:
  myPlaces - the array of places
  handleListClick - the function to manage a list click
  showSideBar - flags whether or not to show the sidebar

### Search
The Search component manages the search field and sets each place to show or hide based on the contents of the search query

#### Props:
  myPlaces - the array of places
  handleListClick - the function to manage a list click
  showSideBar - flags whether or not to show the sidebar

### SiteDetails
The SiteDetails component manages the rendering of the site Details within both the infoBox and in the sidebar.

If there is a marker selected (either from the map or the list box), it displays the place name, some standard helpful links, and an image that is retrieved from the Flickr API.

If there is not a marker selected, then the SiteDetails renders instructions for the user, the default helpful links, and the default image.

If the browser is offline, then it displays the standard information and a default picture.

#### State
  flickrAPIKey: - flickr API key
  flickrURL -  flickr URL - holds the API call
  flickrTitle - title of the image
  flickrNotFound - path to the image to use if nothing is returned from flickr API
  flickrGroup - group_id to limit searches
  offlineImage - image to use in place of flickr image when browser is offline

#### Props
  place - the place for which to display details
  mapCenter - the map mapCenter
  isInfoBox - indicates whether to display details in the infoBox or side bar
  activeMarkerID - ID of the active marker
}

## User Instructions
- Once you run `npm start`, the server opens a browser window to the application home page. Typically, this is found at localhost:3000, but may be different, depending on your computer configuration.

### Toggle the side bar
- Click on the arrow in the header to hide/show the side bar.  This is extremely useful for mobile.

### Explore the map
- The map starts off showing a marker for each campground in the Land Between the Lakes National Recreation Area.  When you hover over the marker it turns yellow, and will display the campsite name.  To view details about a specific campsite, simply click on its marker.  The marker will turn red, and the site details will be displayed, either on the side bar, or in a map infoBox.

### Search for campsite
- Make sure the side bar is showing.  If not, toggle the side bar.
- Start typing a search string in the search box.  The list of campsites will filter and only show  campsite that include the letters typed in the search box anywhere in the name.  At the same time, the map markers are updated to only display markers for the filtered campsites.
- Note that right now, the search is case sensitive.

### View details about a campsite
- Campsite details are rendered in two different places, depending on whether or not the side bar is visible
- Side bar visible - Site details can be viewed below the list of campsites.  If a campsite is not selected, then the site details container displays instructions for locating and viewing a campsite.
- Side bar not visible - Site details will be displayed as an infoBox on the map
- To view a campsite, either select the campsite from the list box on the sidebar or click on a marker on the map.
- To clear the campsite details, click a selected item in the list box, or click on the selected (pink) marker.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Credits

Tent icon:  https://creativecommons.org/licenses/by-sa/3.0/legalcode by Nicolas Mollet
