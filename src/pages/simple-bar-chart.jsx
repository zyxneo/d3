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
import './simple-bar-chart.scss'

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
      data: [30, 86, 168, 281, 303, 365],
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
    const x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, 500])

    const bars = d3.select('.bar-chart')
      .selectAll('div')
      .data(data)

    bars.transition()
      .duration(1000)
      .ease(d3.easeExpInOut)
      .delay((d, i) => i * 200)
      .style('width', d => `${x(d)}px`)
      .text(d => d)

    bars.enter().append('div')
      .classed('bar', true)
      .style('width', d => `${x(d)}px`)
      .text(d => d)

    bars.exit().remove()
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
        <div className="simple-bar-chart">
          <div className="bar-chart" />
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
