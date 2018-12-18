// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'

type Props = {
  canvasRef: HTMLElement,
}

class IndexPage extends React.Component<Props> {
  props: Props

  constructor(props: Props) {
    super(props)
    // $FlowIgnore
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    this.updateBar()
  }

  componentDidUpdate() {
    this.updateBar()
  }

  updateBar = () => {
    // Force-Directed Graph
    // based on https://bl.ocks.org/mbostock/f584aa36df54c451c94a9d0798caed35

    // $FlowIgnore
    const canvas = document.querySelector('.force-directed-graph')

    // $FlowIgnore
    const context = this.canvasRef.current.getContext('2d')
    const {
      width,
      height,
    } = canvas

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter())

    d3.json(withPrefix('/db/miserables.json')).then((graph, error) => {
      if (error) throw error

      function drawLink(d) {
        context.moveTo(d.source.x, d.source.y)
        context.lineTo(d.target.x, d.target.y)
      }

      function drawNode(d) {
        context.moveTo(d.x + 3, d.y)
        context.arc(d.x, d.y, 3, 0, 2 * Math.PI)
      }

      function ticked() {
        context.clearRect(0, 0, width, height)
        context.save()
        context.translate(width / 2, height / 2 + 40)

        context.beginPath()
        graph.links.forEach(drawLink)
        context.strokeStyle = '#aaa'
        context.stroke()

        context.beginPath()
        graph.nodes.forEach(drawNode)
        context.fill()
        context.strokeStyle = '#fff'
        context.stroke()

        context.restore()
      }
      simulation
        .nodes(graph.nodes)
        .on('tick', ticked)

      simulation.force('link')
        .links(graph.links)
    })
  }

  render() {
    return (
      <Layout>
        <canvas
          className="force-directed-graph"
          width="960"
          height="500"
          // $FlowIgnore
          ref={this.canvasRef}
        />
      </Layout>
    )
  }
}

export default IndexPage
