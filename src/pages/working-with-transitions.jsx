// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'
// $FlowIgnore

import Layout from '../components/Layout'
// $FlowIgnore
import './working-with-transitions.scss'

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
    d3.select('.working-with-transitions')
      .transition()
      .delay(1000)
      .duration(4000)
      .ease(d3.easeBounceInOut)
      .styleTween('background-color', () => d3.interpolate('purple', 'yellow'))
      // When interpolating to or from zero, some interpolated values may be very small. JavaScript formats small numbers in exponential notation, which unfortunately is not supported by CSS. For example, when transitioning opacity to fade in or out, the number 0.0000001 is converted to the string "1e-7" and then ignored, giving the default value of 1! To avoid distracting flicker, start or end the transition at 1e-6 rather than 0; this is the smallest value not formatted in exponential notation.

      .transition()
      .styleTween('opacity', () => d3.interpolate(1, 1e-6))
      .duration(4000)
  }

  render() {
    return (
      <Layout>
        <div className="working-with-transitions" />
      </Layout>
    )
  }
}

export default IndexPage
