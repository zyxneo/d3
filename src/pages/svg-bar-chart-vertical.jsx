// @flow

import React from 'react'
import * as d3 from 'd3'
// $FlowIgnore

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

  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.updateBar()
  }

  componentDidUpdate() {
    this.updateBar()
  }

  updateBar = () => {
    const width = 960
    const height = 500

    // https://github.com/d3/d3-scale

    const x = d3.scaleBand()
      .range([0, width])
      .paddingInner(0.2)
      .paddingOuter(0.8)
      .round(true)

    const y = d3.scaleLinear()
      .range([height, 0])

    const chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', height)

    d3.tsv('/db/data-vertical.tsv').then((data) => {
      x.domain([...data.map(d => d.letter)])
      y.domain([0, Math.max(...data.map(d => d.frequency))])

      const bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
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
        .attr('transform', d => `rotate(90), translate(${y(d.frequency)}, -${x.bandwidth() / 2})`)
        .text(d => d.frequency)
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
