// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'
// $FlowIgnore
// import './axis-styling.scss'

type Props = {
  data: Array<number>,
}

type State = {
  data: Array<number>,
}

class IndexPage extends React.Component<Props, State> {
  props: Props

  state: State

  componentDidMount() {
    this.updateBar()
  }

  componentDidUpdate() {
    this.updateBar()
  }

  updateBar = () => {
    // example from https://bl.ocks.org/mbostock/3371592

    const svg = d3.select('.axis-styling svg')
    const margin = {
      top: 20,
      right: 0,
      bottom: 20,
      left: 0,
    }
    const width = +svg.attr('width') - margin.left - margin.right
    const height = +svg.attr('height') - margin.top - margin.bottom
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('class', 'wrapper')

    const formatNumber = d3.format('.1f')

    const x = d3.scaleTime()
      .domain([new Date(2010, 7, 1), new Date(2012, 7, 1)])
      .range([0, width])

    const y = d3.scaleLinear()
      .domain([0, 2e6])
      .range([height, 0])

    const xAxis = d3.axisBottom(x)
      .ticks(d3.timeYear)

    const yAxis = d3.axisRight(y)
      .tickSize(width)
      .tickFormat((d, i) => {
        const s = formatNumber(d / 1e6)
        return i === 10 ? `$${s} million` : `\xa0${s}`
      })

    const xAxisG = g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    xAxisG.select('.domain').remove()

    const yAxisG = g.append('g')
      .attr('class', 'y axis')
      .call(yAxis)

    yAxisG.selectAll('.tick:not(:first-of-type) line')
      .attr('stroke', '#777')
      .attr('stroke-dasharray', '2,2')

    yAxisG.selectAll('.tick text')
      .attr('x', 4)
      .attr('dy', -4)

    yAxisG.select('path.domain')
      .remove()
  }

  render() {
    return (
      <Layout>
        <div className="axis-styling">
          <svg width="960" height="500" style={{ display: 'block', margin: '0 auto' }} />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
