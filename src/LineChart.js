import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function LineChart({ data }) {
  const ref = useD3(
    (svg) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 500
      const height = 500
    
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.year)) // neeed to convert date to year
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      // svg.append("g")
      //   .attr("transform",`translate(0,${height})`)
      //   .call(d3.axisBottom(x))

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.sales)]) // specify value for year
        .rangeRound([height - margin.bottom, margin.top]);
      svg.append("g")
        .call(d3.axisLeft(y));

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(yAxis);

      svg
        .select(".plot-area")
          .attr("width",  width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`)
        .append("path")
          .datum(data)
          .attr("fill","none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x((d)=> {return x(d.year)})
              .y((d)=> {return y(d.sales)})
          )
        // .attr("fill", "steelblue")
        // .selectAll(".bar")
        // .data(data)
        // .join("rect")
        // .attr("class", "bar")
        // .attr("x", (d) => x(d.year))
        // .attr("width", x.bandwidth())
        // .attr("y", (d) => y1(d.sales))
        // .attr("height", (d) => y1(0) - y1(d.sales));
    },
    [data.length]
  );

  return (
    <div id="linecontainer">
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
    </div>
  );
}

export default LineChart;