import * as d3 from 'd3'
(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var width = 600
  var height = 400
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }

  var svg = d3
    .select('#chart14')
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

  var heightScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, height])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['maroon', 'indianred', 'pink'])

  var yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 0])

  // Build your scales here

  d3.csv(require('./eating-data.csv')).then(ready)

  function ready(datapoints) {
    // Add and style your marks here
    var names = datapoints.map(function(d) {
      return d.name
    })
    xPositionScale.domain(names)

    svg
      .selectAll('rect')
      .data(datapoints)
      .enter()
      .append('rect')
      .attr('y', function(d) {
        return yPositionScale(d.hamburgers)
      })
      .attr('x', function(d) {
        return xPositionScale(d.name)
      })
      .attr('width', width / 6.9)
      .attr('height', function(d) {
        return heightScale(d.hamburgers)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })

    var xAxis = d3.axisBottom(xPositionScale)
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    var yAxis = d3.axisLeft(yPositionScale)
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)
  }
})()
