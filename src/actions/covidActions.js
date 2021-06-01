
export const coviddata = () =>{
    return{
        type: "COVIDDATA"
    }
}

export const allcountries = () =>{
    return{
        type: "ALLCOUNTRIES"
    }
}

export const leaderboard = () =>{
    return{
        type: "LEADERBOARD"
    }
}

export const LOADING_STATE = () =>{
    return{
        WAITING: "waiting",
        REQUSTED: "requested",
        ERROR: "error"
    }
}

// d3.csv('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv').then(
//     (response)=>{
//       // console.log(response)
//       setCovidData(response)
//       const col = response.map(d=> d.location)
//       // console.log("Set:",[...new Set(co)])
//       const distinct_col = Array.from([...new Set(col)])
//       var block = distinct_col.map((row,index)=>{
//         return { id: index, name: row}
//       })
//       //console.log("block",block)
//       setAllCountries(block)


//       // Processing Leaderboard data ------------------------------------------------------------------------------------
//       console.log(currentDate.subtract(1,'days').format("YYYY-MM-DD"))
//       const delta = response.filter(d=>{
//         if ( Moment(d.date).isSame(yesterday) && (d.continent != "") ){ //"2021-05-31"
//         return d
//         }
//       })

//       //delta = delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? 1: -1)
//       setLeaderboard(delta.sort((a,b) =>  parseFloat(a.total_cases) > parseFloat(b.total_cases) ? -1: 1))
