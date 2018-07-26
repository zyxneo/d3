// @flow

import React from 'react'
import * as d3 from 'd3'
// $FlowIgnore
import {
  Button,
  Icon,
} from 'semantic-ui-react'

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
    this.state = {
      data: [4, 8, 15, 16, 23, 42],
    }
  }

  componentDidMount() {
    this.updateBar()
  }

  componentDidUpdate() {
    this.updateBar()
  }

  updateBar = () => {
    const { data } = this.state

    const width = 500
    const barHeight = 20

    const x = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, width])

    const chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', barHeight * data.length)

    const bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(0, ${i * barHeight})`)

    bar.append('rect')
      .attr('width', x)
      .attr('height', barHeight - 1)

    bar.append('text')
      .attr('x', d => x(d) - 3)
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(d => d)
  }

  randomize = () => {
    const newData = d3.range(6).map(() => Math.round(Math.random() * 2000))

    this.setState({
      data: newData,
    })
  }

  render() {
    return (
      <Layout>
        <div className="svg-bar-chart">
          <svg className="chart" />
        </div>

        <Button
          animated="fade"
          primary
          onClick={this.randomize}
        >
          <Button.Content visible>Randomize</Button.Content>
          <Button.Content hidden><Icon name="random" /></Button.Content>
        </Button>
      </Layout>
    )
  }
}

export default IndexPage
