This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Covidapp

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Git Clone

- `git clone https://github.com/EclipseEsp/covidapp`
- `cd to /covidapp`
- `npm install`
- To run locally change in package.json:
    -   from "scripts": { "start": "serve -s build", ... }
    -   to "scripts": { "start": "react-scripts start", ... }
- `npm start`

## App Features

Features includes:
- Search bar - to search for valid country
- Global map - navigation and selecting country 
- Trend chart - graphical display for various parameters
- Doughnut chart - view percentage of country affected
- News - open a new tab for news
- Countries ranking - top 15 countries affected
- Latest info - info based on latest available information
- Favourites - add countries of user's interest for convenience

## Fixes Required

- filtering/sorting of `leaderboard` not working as expected
- `development` troubleshooting required for filtering/sort in Redux reducers:
    - SerializableStateInvariantMiddleware took 1210ms, which is more than the warning treshold of 32ms.
    - ImmutableStateInvariantMiddleware took 1400ms, which is more than the warning threshold of 32ms. 
    - If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
    It is disabled in production builds, so you don't need to worry about that.
    - Check reducers return logic
- processing large state array `covidData` causes app to slow


## Key Dependencies
 - "npm": "6.14.11"
 - "node": "14.15.1"
 - "d3": "^6.7.0"
 - "moment": "^2.29.1"
 - "react-icons": "^4.2.0"
 - "react-redux": "^7.2.4"
 - "react-search-autocomplete": "^5.2.2"
 - "react-simple-maps": "^2.3.0"
 - "react-tooltip": "^4.2.21"
 - "redux-thunk": "^2.3.0"
 - "serve": "^11.3.2"


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
