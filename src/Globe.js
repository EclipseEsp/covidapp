import { Component } from "react"
import './App.css'
import * as d3 from 'd3'


class Globe extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        rotation: 0
      }
    }
    
    render() {
      let projection = d3.geoOrthographic()
        .fitSize([this.props.size, this.props.size], this.props.geoJson)
        .rotate([60])
      
      let geoGenerator = d3.geoPath()
        .projection(projection)
      
      let pathString = geoGenerator(this.props.geoJson)
      
    //   console.log("pathString",pathString)
    //   window.requestAnimationFrame(() => {
    //     this.setState({
    //       rotation: this.state.rotation + 0.2
    //     })
    //   })
      
      
      return <svg width={this.props.size} height={this.props.size} >
        <path d={pathString} onClick={()=>console.log("test")} />
      </svg>
    }
  }

  export default Globe;
  