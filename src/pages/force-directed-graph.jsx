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

    let selectedNode

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))


    d3.json(withPrefix('/db/miserables.json')).then((graph, error) => {
      if (error) throw error

      function drawLink(d) {
        context.moveTo(d.source.x, d.source.y)
        context.lineTo(d.target.x, d.target.y)
      }

      function drawNode(d) {
        const rad = 4
        const maxWidth = 30
        const textPadding = 6

        context.save()
        context.beginPath()
        context.lineWidth = 2
        context.strokeStyle = '#fff'
        context.setLineDash([])
        context.stroke()
        context.moveTo(d.x + rad, d.y)
        context.arc(d.x, d.y, rad, 0, 2 * Math.PI)

        context.font = '10px sans-serif'
        context.fillText(d.id, d.x + rad + textPadding, d.y + rad, maxWidth)
        context.fillStyle = selectedNode === d ? 'red' : '#333'
        context.fill()
        context.stroke()
        context.restore()
      }

      function dragstarted() {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d3.event.subject.fx = d3.event.subject.x
        d3.event.subject.fy = d3.event.subject.y
      }

      function dragged() {
        d3.event.subject.fx = d3.event.x
        d3.event.subject.fy = d3.event.y
      }

      function dragended() {
        if (!d3.event.active) simulation.alphaTarget(0)
        d3.event.subject.fx = null
        d3.event.subject.fy = null
        selectedNode = d3.event.subject
      }

      function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y)
      }

      function ticked() {
        context.clearRect(0, 0, width, height)
        context.save()

        context.beginPath()
        graph.links.forEach(drawLink)
        context.lineWidth = 0.5
        context.strokeStyle = '#333'
        context.setLineDash([2])
        context.stroke()

        graph.nodes.forEach(drawNode)

        context.restore()
      }

      simulation
        .nodes(graph.nodes)
        .on('tick', ticked)

      simulation
        .force('link')
        .links(graph.links)

      d3.select(canvas)
        .call(d3.drag()
          .container(canvas)
          .subject(dragsubject)
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
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
