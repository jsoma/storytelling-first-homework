import * as d3 from 'd3'
(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var width = 400
  var height = 400
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }

  var svg = d3
    .select('#chart10')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', width + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  d3.csv(require('./eating-data.csv')).then(ready)

  function ready(datapoints) {
    // Add and style your marks here
    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#FF7051')
      .attr('cx', function(d) {
        return xPositionScale(d.hamburgers)
      })
      .attr('cy', function(d) {
        return yPositionScale(d.hotdogs)
      })

    var yAxis = d3.axisLeft(yPositionScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }
})()
