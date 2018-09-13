import * as d3 from 'd3'
(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var width = 400
  var height = 600
  var margin = { top: 50, right: 50, bottom: 50, left: 75 }

  var svg = d3
    .select('#chart13')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here

  var xPositionScale = d3
    .scaleBand()
    .domain([])
    .range([0, width])

  var yPositionScale = d3
    .scaleBand()
    .domain([])
    .range([height, 0])

  var xScalers = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['maroon', 'indianred', 'pink'])

  d3.csv(require('./eating-data.csv')).then(ready)

  function ready(datapoints) {
    // Add and style your marks here
    var names = datapoints.map(function(d) {
      return d.name
    })
    yPositionScale.domain(names)

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('height', height / 7)
      .attr('width', function(d) {
        return xScalers(d.hamburgers)
      })
      .attr('x', 10)
      .attr('y', function(d) {
        return yPositionScale(d.name)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
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
