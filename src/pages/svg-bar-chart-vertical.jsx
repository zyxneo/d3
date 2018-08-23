// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'
// $FlowIgnore
import './svg-bar-chart-vertical.scss'

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
    // this.updateBar() // cause multiple "select" and "append", ends with repeating svg nodes
  }

  updateBar = () => {
    const margin = {
      top: 20,
      right: 30,
      bottom: 30,
      left: 40,
    }
    const width = 960 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    // https://github.com/d3/d3-scale

    const x = d3.scaleBand()
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.8)
      .round(true)

    const y = d3.scaleLinear()
      .range([height, 0])

    const chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    d3.tsv(withPrefix('/db/data-vertical.tsv')).then((data) => {
      x.domain(data.map(d => d.letter))
      y.domain([0, Math.max(...data.map(d => d.frequency))])

      const bar = chart.selectAll('g.column')
        .data(data)
        .enter().append('g')
        .attr('class', '.column') // do not forget to identify selection!
        .attr('transform', d => `translate(${x(d.letter)},0)`)

      bar.append('rect')
        .attr('y', d => y(d.frequency))
        .attr('height', d => height - y(d.frequency))
        .attr('width', x.bandwidth())

      bar.append('text')
        .attr('text-anchor', 'start')
        .attr('dy', '.35em')
        /* eslint-disable no-confusing-arrow */
        .attr('dx', d => (y(d.frequency) >= height / 2) ? '-1em' : '4em')
        .attr('class', d => (y(d.frequency) >= height / 2) ? 'upper' : 'lower')
        /* eslint-enable no-confusing-arrow */
        .attr('transform', d => `rotate(90), translate(${y(d.frequency)}, -${x.bandwidth() / 2})`)
        .text(d => d.frequency)

      const xAxis = d3.axisBottom(x)
        .tickValues(data.map(d => d.letter))

      chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

      const yAxis = d3.axisLeft(y)
        .ticks(10)

      chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
    })
  }

  render() {
    return (
      <Layout>
        <div className="svg-bar-chart-vertical">
          <svg className="chart" />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
