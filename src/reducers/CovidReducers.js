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
        case "ALLCOUNTRIES":
          return {...state, allCountries: action.payload};
        case "LEADERBOARD":
          return {...state, leaderboard: action.payload};
        case "LOADING":
          return {...state, loading: action.payload};
        default:
            return state;
    }
}

export default covidReducer;

