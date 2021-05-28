import React , {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import * as d3 from 'd3'
import Globe from "./Globe"
import * as topojson from "topojson"


import WorldMap from "./WorldMap"
// import ReactGlobe from 'react-globe';
// import * as THREE from 'three';

function App() {
  const [geoJson,setGeoJson] = useState({})
  const [pathString,setPathString] = useState("")
  const [covidData,setCovidData] = useState(null)


  //https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json
  useEffect(()=>{
    d3.json('https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json')
    // fetch('world-110m2.json').then(response => response.json())
    // fetch('https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json').then((response)=>console.log(response.json()))
    // .catch(error=>console.log(error))

    .then(json=>{
      setGeoJson(topojson.feature(json,json.objects.countries))
    })
    // .then(json=>console.log(json))
    .catch(error=>console.log(error))

    d3.csv('public/owid-covid-data.csv').then(
      (response)=>{
        console.log(response)
      }
    ).catch(error=>console.log(error))
  },[])
  // d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json', function(err, json) {
  // geojson = json;}).then(json=>console.log(json))
  // let geoJson;
  // d3.json('./countries-110m.json', (error, json) => {
  //   geoJson = topojson.feature(json,json.objects.collections)
  //   console.log(geoJson)
  // }).catch(error=>console.log(error))

  return (
    <div className="App">
      <h1>Test</h1>
      <Globe geoJson={geoJson} size={400} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
