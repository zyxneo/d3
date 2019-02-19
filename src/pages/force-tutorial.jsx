// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import * as d3 from 'd3'
import drawArrow from '../utils/drawArrow'

import Layout from '../components/Layout'

type Props = {}

class IndexPage extends React.Component<Props> {
  props: Props

  componentDidMount() {
    // $FlowIgnore
    const canvas = document.querySelector('.force-tutorial')

    // $FlowIgnore
    const context = canvas.getContext('2d')
    const {
      width,
      height,
    } = canvas

    /*
    for (let i = 0; i < width / 10; i += 1) {
      context.lineWidth = 1
      // context.strokeStyle = ''
      context.beginPath()
      context.moveTo(i * 10, 0)
      context.lineTo(i * 25, height)
      context.stroke()
    }
    */

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id)) // centering | collision | link | many-body | positioning
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))


    d3.json(withPrefix('/db/force-tutorial.json')).then((data, error) => {
      if (error) throw error

      const maxValue = Math.max(...data.links.map(o => o.value), 0)
      const maxRadius = 100
      const radiusRatio = maxRadius / maxValue

      let selectedNode
      const rad = 8
      const textPadding = 6

      function drawNode(d) {
        // called on node moveing

        /*
        Each node must be an object. The following properties are assigned by the simulation:

        index - the node’s zero-based index into nodes
        x - the node’s current x-position
        y - the node’s current y-position
        vx - the node’s current x-velocity
        vy - the node’s current y-velocity

        d = {
          group: 1
          id: "Node.B"
          index: 1
          vx: -0.00008476276209932095
          vy: -0.00042067233262120133
          x: 451.89991318504906
          y: 254.84573559959185
        }
        */
        const color = d.color || '#333'
        context.save()
        context.beginPath()
        context.moveTo(d.x + rad, d.y)
        context.arc(d.x, d.y, rad, 0, 2 * Math.PI)

        context.font = '10px sans-serif'
        context.fillText(d.id, d.x + rad + textPadding, d.y + rad)
        context.fillStyle = selectedNode === d ? '#FF4136' : color
        context.fill()
        context.strokeStyle = '#fff'
        context.lineWidth = 2
        context.stroke()
        context.restore()
      }

      function drawTooltip(d) {
        if (selectedNode === d && d.tooltip) {
          const textMeasurements = context.measureText(d.tooltip) // TextMetrics object
          context.fillStyle = '#fff'
          context.fillRect(d.x + rad, d.y - rad - 10, textMeasurements.width + 10, 12)
          context.fillStyle = '#333'
          context.fillText(d.tooltip, d.x + rad + textPadding, d.y - rad)
        }
      }

      function drawLink(d) {
        context.save()
        context.beginPath()
        // setting default style
        // drawing white link
        context.lineWidth = 6
        context.strokeStyle = '#fff'
        // https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
        if (d.type === 'translation') {
          context.moveTo(d.source.x, d.source.y)
          context.lineTo(d.target.x, d.target.y)
          context.stroke()

          // drawing purple dotted link to the top
          context.beginPath()
          context.setLineDash([3])
          context.strokeStyle = 'purple'
          context.lineWidth = 1
          context.moveTo(d.source.x, d.source.y)
          context.lineTo(d.target.x, d.target.y)
        } else {
          const arrowObject = {
            context,
            fromX: d.source.x,
            fromY: d.source.y,
            toX: d.target.x,
            toY: d.target.y,
            headLength: 10,
            offset: -10,
          }
          drawArrow(arrowObject)
          context.stroke()

          // drawing black link to the top
          context.beginPath()
          context.lineWidth = 0.5
          context.strokeStyle = '#333'
          drawArrow(arrowObject)
        }
        context.stroke()
        context.restore()
        context.setLineDash([])
      }

      function dragstarted() {
        /*
        console.log(d3.event.subject)
        {
          fx: null
          fy: null
          group: 2
          id: "Node.D"
          index: 3
          vx: 0.001943628970053043
          vy: -0.00012538602873635768
          x: 479.1882200675123
        }
        */
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        // Restart the simulation’s internal timer and return the simulation. In conjunction with simulation.alphaTarget or simulation.alpha, this method can be used to “reheat” the simulation during interaction, such as when dragging a node, or to resume the simulation after temporarily pausing it with simulation.stop.
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
        // simulation.stop()
        selectedNode = d3.event.subject
      }

      function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y)
      }

      /*
      function clicked(d) {
        const node = simulation.find(d.x, d.y)
        // not working...
        console.log(d)
        console.log(node)
      }
      canvas.addEventListener('click', clicked)
      */

      function ticked() {
        context.clearRect(0, 0, width, height)
        context.save()


        data.links.forEach(drawLink)

        // drawing node with white border
        context.beginPath()
        data.nodes.forEach(drawNode)
        data.nodes.forEach(drawTooltip)

        context.restore()
      }

      simulation
        .nodes(data.nodes)
        .on('tick', ticked)

      simulation
        .force('link')
        .distance(d => d.value * radiusRatio) // distance of the nodes
        // .strength(link => 1 / Math.min(count(link.source), count(link.target)))
        .links(data.links)

      // simulation
      //   .alphaDecay(0)

      // velocityDecay to 0 - rubberband effect
      // velocityDecay to 1 - no flexibility
      // default is 0.4
      simulation.velocityDecay(0.2)

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
          className="force-tutorial"
          width="960"
          height="500"
        />
      </Layout>
    )
  }
}

export default IndexPage
