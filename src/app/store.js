import { configureStore, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import covidReducer from '../reducers/CovidReducers';
import { LOADING_STATE } from '../actions/covidActions';
import thunk from "redux-thunk";
import Moment from 'moment';
import * as d3 from 'd3';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    covid: covidReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false
    })
  }
});

var currentDate = Moment(new Date())
var yesterday = currentDate.subtract(5,"days").format("YYYY-MM-DD")

export const fetchCovidData = () => {
  return (dispatch) => {
    dispatch({type: "LOADING", payload: LOADING_STATE.REQUESTED})
    d3.csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv')
    .then((response)=>{
        console.log("fetchCovidData",response)
        // dispatch({type: "COVIDDATA", payload: response})
        // const col = response.map(d=> d.location)
        // // console.log("Set:",[...new Set(co)])
        // const distinct_col = Array.from([...new Set(col)])
        // var block = distinct_col.map((row,index)=>{
        //   return { id: index, name: row}
        // })
        // console.log("allcountries",block)
        // // dispatch({type: "ALLCOUNTRIES", payload: block})
        // const delta = (response.filter(d=>{
        //   if ( d.date == "2021-05-31" ){ //"2021-05-31"
        //   return d
        //   }
        // }))
        // var block2 = delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? -1: 1)
        // //delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? -1: 1)
        // console.log("leaderboard",block2)
        dispatch({type: "COVIDDATA", payload: response})
        // dispatch({type: "ALLCOUNTRIES", payload: response})
        // dispatch({type: "LEADERBOARD", payload: response})
        // dispatch({type: "ALLCOUNTRIES", payload: block})  
        // dispatch({type: "LEADERBOARD", payload: delta})
    }).catch((e)=>{
      dispatch({type: "LOADING", payload: LOADING_STATE.ERROR})
    })
  }
}

store.dispatch(fetchCovidData())