// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import * as d3 from 'd3'
// $FlowIgnore

import Layout from '../components/Layout'
// $FlowIgnore
import './svg-bar-chart.scss'

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
    const width = 500
    const barHeight = 24

    const x = d3.scaleLinear()
      .range([0, width])

    const chart = d3.select('.chart')
      .attr('width', width)

    d3.tsv(withPrefix('/db/data.tsv')).then((data) => {
      x.domain([0, Math.max(...data.map(d => d.value))])

      chart.attr('height', barHeight * data.length)

      const bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', (d, i) => `translate(0,${i * barHeight})`)

      bar.append('rect')
        .attr('width', d => x(d.value))
        .attr('height', barHeight - 1)

      bar.append('text')
        .attr('x', d => x(d.value) - 3)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(d => d.value)
    })
  }

  render() {
    return (
      <Layout>
        <div className="svg-bar-chart">
          <svg className="chart" />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
