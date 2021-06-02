const initialState = {
  covidData: [],
  allCountries: [],
  leaderboard: [],
  loading: []
}


const covidReducer = (state=initialState,action) =>{
    switch (action.type) {
        case "COVIDDATA":
          return { ...state, covidData: action.payload};
        case "ALLCOUNTRIES": {
          const col = action.payload.response.map(d=> d.location)
          const distinct_col = Array.from([...new Set(col)])
          var block = distinct_col.map((row,index)=>{
            return { id: index, name: row}
          })
          console.log("Reducer: ALLCOUNTRIES", block)
          return {block};
        }
        case "LEADERBOARD": {
          const delta = (action.payload.response.filter(d=>{
            if ( d.date == "2021-05-31" ){ //"2021-05-31"
            return d
            }
          }))
          var block2 = delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? -1: 1)
          //delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? -1: 1)
          console.log("Reducer: LEADERBOARD", block2)
          return { block2};
        }
        case "LOADING":
          return {...state, loading: action.payload};
        default:
            return state;
    }
}

export default covidReducer;

