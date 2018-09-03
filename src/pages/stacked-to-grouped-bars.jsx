// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'
// $FlowIgnore
// import './axis-styling.scss'

type Props = {
  value: string,
}

type State = {
  value: string,
}

const palette = [
  '#3182bd',
  '#6baed6',
  '#9ecae1',
  '#c6dbef',
]
// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
const bumps = (m) => {
  const values = []
  let i
  let j
  let w
  let x
  let y
  let z

  // Initialize with uniform random values in [0.1, 0.2).
  for (i = 0; i < m; i += 1) {
    values[i] = 0.1 + 0.1 * Math.random()
  }

  // Add five random bumps.
  for (j = 0; j < 5; j += 1) {
    x = 1 / (0.1 + Math.random())
    y = 2 * Math.random() - 0.5
    z = 10 / (0.1 + Math.random())
    for (i = 0; i < m; i += 1) {
      w = (i / m - y) * z
      values[i] += x * Math.exp(-w * w)
    }
  }

  // Ensure all values are positive.
  for (i = 0; i < m; i += 1) {
    values[i] = Math.max(0, values[i])
  }

  return values
}

class IndexPage extends React.Component<Props, State> {
  props: Props

  state: State

  componentDidMount() {
    this.updateBar()
  }

  updateBar = () => {
    // example from http://bl.ocks.org/mbostock/3943967

    const n = 4 // The number of series.

    const m = 58 // The number of values per series.

    // The xz array has m elements, representing the x-values shared by all series.
    // The yz array has n elements, representing the y-values of each of the n series.
    // Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
    // The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
    const xz = d3.range(m)
    const yz = d3.range(n)
      .map(() => bumps(m))

    const y01z = d3.stack()
      .keys(d3.range(n))(d3.transpose(yz))
    const yMax = d3.max(yz, y => d3.max(y))
    const y1Max = d3.max(y01z, y => d3.max(y, d => d[1]))

    const svg = d3.select('svg')

    const margin = {
      top: 40,
      right: 10,
      bottom: 20,
      left: 10,
    }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand()
      .domain(xz)
      .rangeRound([0, width])
      .padding(0.08)

    const y = d3.scaleLinear()
      .domain([0, y1Max])
      .range([height, 0])

    const color = d3.scaleOrdinal()
      .domain(d3.range(n))
      .range(palette)

    const series = g.selectAll('g.series')
      .data(y01z)
      .enter().append('g')
      .attr('fill', (d, i) => color(i))
      .attr('class', 'series')
      .attr('data-index', (d, i) => i)

    const rect = series.selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', height)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      // getting properties from the parent node
      .attr('data-index', (d, i, a) => a[i].parentNode.dataset.index)


    const transitionGrouped = () => {
      y.domain([0, yMax])

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
        // getting properties from the actual node
        .attr('x', (d, i, a) => x(i) + x.bandwidth() / n * a[i].dataset.index)
        .attr('width', x.bandwidth() / n)
        .transition()
        .attr('y', d => y(d[1] - d[0]))
        .attr('height', d => y(0) - y(d[1] - d[0]))
    }

    const transitionStacked = () => {
      y.domain([0, y1Max])

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]))
        .transition()
        .attr('x', (d, i) => x(i))
        .attr('width', x.bandwidth())
    }

    rect.transition()
      .delay((d, i) => i * 10)
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(0)
        .tickPadding(6))

    const timeout = d3.timeout(() => {
      d3.select('input[value="grouped"]')
        .property('checked', true)
        .dispatch('change')
    }, 2000)


    const changed = (t) => {
      timeout.stop()
      if (t.value === 'grouped') transitionGrouped()
      else transitionStacked()
    }

    d3.select('.stacked-to-grouped-bars')
      .selectAll('input')
      .on('change', (d, i, a) => changed(a[i]))
  }

  render() {
    return (
      <Layout>
        <div className="stacked-to-grouped-bars">
          <label><input type="radio" name="mode" value="grouped" /> Grouped</label>
          <label><input type="radio" name="mode" value="stacked" checked /> Stacked</label>
          <svg width="960" height="500" style={{ display: 'block', margin: '0 auto' }} />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
