import * as d3 from 'd3'
(function() {
  // Build your SVG here
  // using all of that cut-and-paste magic
  var width = 400
  var height = 200
  var margin = { top: 50, right: 50, bottom: 50, left: 50 }

  var svg = d3
    .select('#chart12')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Build your scales here
  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([0, width])

  var radiusScale = d3
    .scaleSqrt()
    .domain([0, 10])
    .range([0, 50])

  var colorScale = d3
    .scaleOrdinal()
    .domain(['cat', 'dog', 'cow'])
    .range(['red', 'green', 'purple'])

  d3.csv(require('./eating-data.csv')).then(ready)

  function ready(datapoints) {
    // Add and style your marks here
    svg
      .selectAll('circle')
      .data(datapoints)
      .enter()
      .append('circle')
      .attr('opacity', 0.25)
      .attr('cy', height / 2)
      .attr('cx', function(d) {
        return xPositionScale(d.hamburgers)
      })
      .attr('r', function(d) {
        return radiusScale(d.hotdogs)
      })
      .attr('fill', function(d) {
        return colorScale(d.animal)
      })
  }
})()
