import React , {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import * as d3 from 'd3'
import * as topojson from "topojson"
// import Globe from "./Globe"
// import LineChart from './LineChart';
// import BarChart from './BarChart';
import Moment from 'moment';

import ReactTooltip from "react-tooltip"
import MapChart from "./MapChart";
import CanvasJSReact from './canvasjs.stock.react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

// import WorldMap from "./WorldMap"
// import ReactGlobe from 'react-globe';
// import * as THREE from 'three';

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;


var currentDate = Moment(new Date())

function App() {
  const [geoJson,setGeoJson] = useState({})
  const [pathString,setPathString] = useState("")
  const [covidData,setCovidData] = useState([])
  const [selectCountry,setSelectedCountry] = useState("No Country Selected.")
  const [allCountries,setAllCountries] = useState([])
  const [favourites,setFavourites] = useState(JSON.parse(localStorage.getItem("favourites"))||[])
  const [filterResult, setFilterResults] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [populationEstimate, setPopulationEstimate] = useState(0)
  const [toggleFav,setToggleFav] = useState(true)

  // Graphs Data
  const [date,setDate] = useState({})
  const [total_cases,setTotal_Cases] = useState([0])
  const [new_cases,setNew_Cases] = useState([])
  const [total_vac,setTotal_Vac] = useState([])
  const [total_tests,setTotal_Tests] = useState([])
  const [total_deaths,setTotal_Deaths] = useState([])
  const [new_deaths,setNew_Deaths] = useState([])

  const [datamax,setDataMax] = useState(0)
  const [datamin,setDataMin] = useState(0)

  const [content, setContent] = useState("");

  // Graphs data
  // The initial values animate, as expected
  const [dataPoints, setDataPoints] = useState(null
    // { label: "apple", y: 5 },
    // { label: "orange", y: 10 },
    // { label: "banana", y: 15 },
    // { label: "mango", y: 20 },
    // { label: "grape", y: 25 }
  );
  const [title, setTitle] = useState("Initial Animation is Fine");

  const [initialized, setInitialized] = useState(false);

  function generateDataPoints(noOfDps){
    var xVal = 1, yVal = 100;
    var dps = [];
    for(var i = 0; i < noOfDps; i++) {
      yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
      dps.push({x: xVal,y: yVal});  
      xVal++;
    }
    return dps;
  }
  const options = {
    title:{
      text: selectCountry
    },
    animationEnabled: true,
    exportEnabled: true,
    //theme: "dark1",
    colorSet: "colorSet4",
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        crosshair: {
          enabled: true,
          //snapToDataPoint: true
        }
      },
      data: [{
        type: "spline",
        //lineColor: "red",
        dataPoints: dataPoints //generateDataPoints(10000)
      }]
    }]
  };

  const options2 = {
    animationEnabled: true,
    title: {
      text: "% of Country Affected"
    },
    subtitles: [{
      text: parseFloat( (total_cases[total_cases.length-1])["y"]/populationEstimate*100 ).toFixed(2) + "%",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      showInLegend: true,
      indexLabel: "{name}: {y}",
      //yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "total cases", y: (total_cases[total_cases.length-1])["y"]  },
        { name: "unaffected", y: populationEstimate - (total_cases[total_cases.length-1])["y"]  },
        // { name: "Very Satisfied", y: 40 },
        // { name: "Satisfied", y: 17 },
        // { name: "Neutral", y: 7 }
      ]
    }]
  }


  const handleClick = (country,population) =>{
    console.log("Parent Callback:",country)
    allCountries.map((d)=>{{
      if(d.name == country){
        setSelectedCountry(country)
      }
    }})
      //setSelectedCountry(country)
    setPopulationEstimate(population)
  }



  // Favourite Component --------------------------------------------------------------------------------------------------
  const FavouriteTab = () => {
    return (
    <div style={
      { display: 'flex',
        flexDirection: 'column', 
        margin:0, top: 100, left:10, 
        zIndex:1, 
        position: 'fixed', 
        backgroundColor: 'white', 
        border: '2px solid black',
        borderRadius: '3px'}}>
          
    <button onClick={()=>{setToggleFav(!toggleFav)}} style={{width:'210px',margin: '5' , backgroundColor: 'transparent'}}>Favourites ({favourites.length})</button>
        { 
          favourites.map(country=>{
            if (toggleFav == true) return (
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <h6 onClick={()=>{setSelectedCountry(country)}}style={{margin: 'auto', alignItems: 'center', padding: 10, borderColor:'black'}}>{country}</h6>
                <button style={{margin: '5px'}} onClick={()=>{
                  setFavourites(favourites.filter(item=>item!== country));
                  alert("Removed from Favourites");}
                  }>remove</button>
            </div>)})
        }
    </div>
  )}

  const handleFavourite = (country) =>{
    if( !favourites.includes(country)){
      setFavourites([...favourites,country])
      alert("Added to Favourites")
    }else{
      setFavourites(favourites.filter(item=>item!== country))
      alert("Removed from Favourites")
    }
  }

  useEffect(()=>{
    if (favourites  != null){
      localStorage.setItem('favourites',JSON.stringify(favourites))
    }
  },[favourites])

  // Searchbar Component --------------------------------------------------------------------------------------------------
  const SearchBar = () => {
    // const items = [
    //   {
    //     id: 0,
    //     name: 'Cobol'
    //   },
    //   {
    //     id: 1,
    //     name: 'JavaScript'
    //   },
    //   {
    //     id: 2,
    //     name: 'Basic'
    //   },
    //   {
    //     id: 3,
    //     name: 'PHP'
    //   },
    //   {
    //     id: 4,
    //     name: 'Java'
    //   }
    // ]

    const handleOnSearch = (string, results) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      console.log(string, results)
    }
  
    const handleOnHover = (result) => {
      // the item hovered
      console.log(result)
    }
  
    const handleOnSelect = (item) => {
      // the item selected
      setSelectedCountry(item.name)
      console.log(item)
    }
  
    const handleOnFocus = () => {
      console.log('Focused')
    }
    return (<div style={{width:400, top: 100, position: 'fixed'}}>
        <ReactSearchAutocomplete
          items={allCountries}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
        />
      {/* <form 
        onSubmit={()=>{
        alert("submitted")}}>
        <input></input>
        <button>Search Bar</button>
      </form> */}
    </div>
  )}


  // Fetch Covid Data ------------------------------------------------------------------------------------------------------
  //https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json
  useEffect(()=>{
    d3.json('https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json')
    .then(json=>{
      setGeoJson(topojson.feature(json,json.objects.countries))
      //test
      // console.log("land",topojson.feature(json, json.objects.land))
      // console.log("countries",topojson.feature(json, json.objects.countries).features)
      // console.log("borders",topojson.mesh(json,json.objects.countries, function(a, b) { return a !== b; }))

    })
    // .then(json=>console.log(json))
    .catch(error=>console.log(error))

    d3.csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv').then(
      (response)=>{
        // console.log(response)
        setCovidData(response)
        const col = response.map(d=> d.location)
        // console.log("Set:",[...new Set(co)])
        const distinct_col = Array.from([...new Set(col)])
        var block = distinct_col.map((row,index)=>{
          return { id: index, name: row}
        })
        //console.log("block",block)
        setAllCountries(block)

        // setAllCountries([...new Set(co)])
        // console.log("test",co.filter((d,i)=>(co.indexOf(d) === i)))
          // if ( !allCountries.includes(d["location"]))
          // {
          //   console.log(allCountries)
           //setAllCountries([...allCountries,d["location"]])
          
      // })
        // })
        // console.log(filtercountry.map((d)=>{
        //   console.log(Moment(d.date).format('DD-MM'))
        //   console.log(d.total_cases)
        // }))
        // var filtercountry = response.filter((d,i)=>{
        //   if (d["location"] == 'Singapore')
        //   {
        //     return d["total_cases"] <= 100;
        //   }
        // })
        // console.log(filtercountry.map((d)=>{
        //   console.log(Moment(d.date).format('DD-MM'))
        //   console.log(d.total_cases)
        // }))
        // setSelectedCountry(filtercountry)
        
      }
    ).catch(error=>console.log(error))
  },[])

  // Fetch Covid Data of Selected Country
  useEffect(()=>{
    if(selectCountry != "No Country Selected."){
        console.log("Fetching Covid Data")
        var results = covidData.filter((row)=>{
          if(row.location == selectCountry)
          return row;
        })

        // const [total_cases,setTotal_Cases] = useState([])
        // const [new_cases,setNew_Cases] = useState([])
        // const [total_vac,setTotal_Vac] = useState([])
        // const [total_tests,setTotal_Tests] = useState([])
        // const [total_deaths,setTotal_Deaths] = useState([])
        // const [new_deaths,setNew_Deaths] = useState([])

        // Preprocessing data for different graphs
        var temp1 = []
        var temp2 = []
        var temp3 = []
        var temp4 = []
        var temp5 = [] 
        var temp6 = []
        var temp_max = 0
        var temp_min = 0
        results.forEach((row,index)=>{
          var block1 = { x: new Date(row.date), y: parseInt(row.total_cases) }
          var block2 = { x: new Date(row.date), y: parseInt(row.new_cases) }
          var block3 = { x: new Date(row.date), y: parseInt(row.total_vaccinations) }
          var block4 = { x: new Date(row.date), y: parseInt(row.total_tests) }
          var block5 = { x: new Date(row.date), y: parseInt(row.total_deaths) }
          var block6 = { x: new Date(row.date), y: parseInt(row.new_deaths) }
          temp1 = [...temp1, block1]
          temp2 = [...temp2, block2]
          temp3 = [...temp3, block3]
          temp4 = [...temp4, block4]
          temp5 = [...temp5, block5]
          temp6 = [...temp6, block6]
          // console.log(row.total_cases)
          // setTotal_Cases([...total_cases,row.total_cases])

          // if (temp_max < parseInt(row.total_cases)){
          //     temp_max = parseInt(row.total_cases)
          // }
        })
        // console.log("results:",total_cases)
        // setFilterResults(results)
        // console.log("temp_total",temp_total)
        // setTotal_Cases(temp_total)
        console.log("temp1",temp1)
        setTotal_Cases(temp1);
        setNew_Cases(temp2);
        setTotal_Vac(temp3);
        setTotal_Tests(temp4);
        setTotal_Deaths(temp5);
        setNew_Deaths(temp6);

        setDataPoints(temp1)
        // setDataMax(temp_max)
        setInitialized(false);
      }
      console.log("results:",total_cases)
  },[selectCountry])

  // This effect simulates dynamic data updates via fetch
  useEffect(() => {
    // console.log("random",generateDataPoints(10000))
    // setDataPoints(generateDataPoints(10000))
    setInitialized(true);
    // if (!initialized) {
    //   setTimeout(() => {
    //     // setDataPoints()
    //     // setDataPoints([
    //     //   { label: "apple", y: 25 },
    //     //   { label: "orange", y: 20 },
    //     //   { label: "mango", y: 10 },
    //     //   { label: "grape", y: 5 }
    //     // ]);
    //     setTitle("Update animates if first render deferred");
    //     //Calling render makes no difference
    //     setInitialized(true);
    //   }, 2000);
    // }
  }, [initialized]);

  const containerProps = {
    // height: "calc(100vh - 150px)"
    width: "100%",
    height: "250px", // 450px
    margin: "auto"
  };

  const containerProps2 = {
    // height: "calc(100vh - 150px)"
    width: "50%",
    height: "250px", // 450px
    // position: "fixed",
    borderColor: "black",
    // top: 100,
    // right: 0,
  };

  return (
    <div className="App">
      {/* <h1>Test</h1> */}
      <FavouriteTab/>
      <SearchBar/>
      <MapChart setTooltipContent={setContent} parentCallback={handleClick} />
      <ReactTooltip>{content}</ReactTooltip>

      <div>
        <button onClick={()=>{setDataPoints(total_cases)}}>total covid cases</button>
        <button onClick={()=>{setDataPoints(new_cases)}}>new cases</button>
        <button onClick={()=>{setDataPoints(total_vac)}}>total vaccinations</button>
        <button onClick={()=>{setDataPoints(total_tests)}}>total tests</button>
        <button onClick={()=>{setDataPoints(total_deaths)}}>total deaths</button>
        <button onClick={()=>{setDataPoints(new_deaths)}}>new deaths</button>
        <button onClick={()=>{handleFavourite(selectCountry)}}>add/remove favourites</button>
        {!initialized ? (
          <h1> Loading...</h1>
        ) : (
          <CanvasJSStockChart containerProps={containerProps} options={options} />
        )}
      </div>
        <CanvasJSChart containerProps={containerProps2} options = {options2}/>
    </div>
  );
}

export default App;
