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
    const { alphabet } = this.state

    const svg = d3.select('svg')
    const height = +svg.attr('height')
    const g = svg.append('g').attr('transform', `translate(32, ${(height / 2)})`)

    function update(data) {
      // DATA JOIN
      // Join new data with old elements, if any.
      const text = g.selectAll('text')
        .data(data)

      // UPDATE
      // Update old elements as needed.
      text.attr('class', 'update')

      // ENTER
      // Create new elements as needed.
      //
      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      text.enter().append('text')
        .attr('class', 'enter')
        .attr('x', (d, i) => i * 32)
        .attr('dy', '.35em')
        .merge(text)
        .text(d => d)

      // EXIT
      // Remove old elements as needed.
      text.exit().remove()
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
            height="100"
          />
        </div>
      </Layout>
    )
  }
}

export default IndexPage
