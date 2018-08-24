// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'
// $FlowIgnore
import './general-update-pattern.scss'

type Props = {
  alphabet: Array<string>,
}

type State = {
  alphabet: Array<string>,
}

class IndexPage extends React.Component<Props, State> {
  props: Props

  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    }
  }

  componentDidMount() {
    this.updateBar()
  }

  componentDidUpdate() {
    this.updateBar()
  }

  updateBar = () => {
    // based on https://bl.ocks.org/mbostock/3808218
    const { alphabet } = this.state

    const svg = d3.select('svg')
    const height = +svg.attr('height')
    const g = svg.append('g').attr('transform', `translate(32, ${(height / 2)})`)

    function update(data) {
      const t = d3.transition()
        .duration(750)
      // DATA JOIN
      // Join new data with old elements, if any.
      const text = g.selectAll('text')
        .data(data, d => d)

      // EXIT old elements not present in new data.
      text.exit()
        .attr('class', 'exit')
        .transition(t)
        .attr('y', 60)
        .style('fill-opacity', 1e-6)
        .remove()

      // UPDATE old elements present in new data.
      text.attr('class', 'update')
        .attr('y', 0)
        .style('fill-opacity', 1)
        .transition(t)
        .attr('x', (d, i) => i * 32)

      // ENTER new elements present in new data.
      text.enter().append('text')
        .attr('class', 'enter')
        .attr('dy', '.35em')
        .attr('y', -60)
        .attr('x', (d, i) => i * 32)
        .style('fill-opacity', 1e-6)
        .text(d => d)
        .transition(t)
        .attr('y', 0)
        .style('fill-opacity', 1)
    }

    // The initial display.
    update(alphabet)

    // Grab a random sample of letters from the alphabet, in alphabetical order.
    d3.interval(() => {
      update(d3.shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort())
    }, 1500)
  }

  render() {
    return (
      <Layout>
        <div className="general-update-pattern">
          <svg
            width="960"
            height="200"
          />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
