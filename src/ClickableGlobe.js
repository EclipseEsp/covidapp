import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import ScriptTag from 'react-script-tag';

function ClickableGlobe({ data }) {
  const ref = useD3(
    (svg) => {
      const width = 950;
      const height = 700;

      var colors = { clickable: 'darkgrey', hover: 'grey', clicked: "red", clickhover: "darkred" };

      var projection = d3.geoOrthographic()
        .scale(300)
        .translate([width/2,height/2])
        .clipAngle(90)
        .precision(10);

      var path = d3.geoPath()
        .projection(projection);
      
      var graticule = d3.geoGraticule();

      var map = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "map");

      var map = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");

      map.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

      map.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

      map.append("use")
      .attr("class", "fill")
      .attr("xlink:href", "#sphere");

      map.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);



      
    },
    [data.length]
  );

  return (
    <body>
      <ScriptTag src="//d3js.org/d3.v3.min.js"></ScriptTag>
      <ScriptTag src="//d3js.org/topojson.v1.min.js"></ScriptTag>
      <ScriptTag src="//d3js.org/queue.v1.min.js"></ScriptTag>
      <ScriptTag src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></ScriptTag>
      <h1>Line Chart</h1>
      <svg
        ref={ref}
        style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </body>
  );
}

export default ClickableGlobe;