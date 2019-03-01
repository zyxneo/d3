// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'
import {
  Header,
  Form,
  // $FlowIgnore
} from 'semantic-ui-react'

import Layout from '../components/Layout'

type Props = {}

type Node = {
  id: string,
  count: number,
}

type Link = {
  source: string,
  target: string,
  repetition: number,
}

type State = {
  data: {
    nodes?: Array<Node>,
    links?: Array<Link>,
    maxCount: number,
    maxRepetition: number,
  };
}

class IndexPage extends React.Component<Props, State> {
  props: Props

  state: State

  handleChange = this.handleChange.bind(this)

  analyze = this.analyze.bind(this)

  constructor(props: Props) {
    super(props)
    this.state = {
      data: {
        maxCount: 1,
        maxRepetition: 0,
      },
    }
  }

  componentDidUpdate() {
    this.updateBar()
  }

  handleChange(e:Event) {
    const text = e.target.value
    this.analyze(text)
  }

  analyze(text) {
    const trimmed = text.replace(/[\u00D8-\u024F]/g, '').replace(/ /g, '').toLowerCase()
    const letterArray = Array.from(trimmed)
    const data = {
      nodes: [],
      links: [],
      maxCount: 1,
      maxRepetition: 1,
    }
    letterArray.map((letter, i) => {
      // adding nodes
      let nodeExist = false
      data.nodes.map((node) => {
        if (node.id === letter) {
          nodeExist = true
          /* eslint-disable no-return-assign, no-param-reassign */
          return [node.count += 1, data.maxCount = Math.max(node.count += 1, data.maxCount)]
        }
      })
      if (!nodeExist) {
        data.nodes.push({ id: letter, count: 1 })
      }

      // adding links
      let linkExist = false
      data.links.map((link) => {
        if (link.source === letter && link.target === letterArray[i + 1]) {
          linkExist = true
          return [link.repetition += 1, data.maxRepetition = Math.max(link.repetition += 1, data.maxRepetition)]
          /* eslint-enable no-return-assign, no-param-reassign */
        }
        return null
      })
      if (!linkExist && typeof letterArray[i + 1] !== 'undefined') {
        data.links.push({ source: letter, target: letterArray[i + 1], repetition: 1 })
      }
      return null
    })

    this.setState({
      data,
    })
  }

  updateBar = () => {
    // Force-Directed Graph
    // based on https://bl.ocks.org/mbostock/f584aa36df54c451c94a9d0798caed35

    // $FlowIgnore
    const canvas = document.querySelector('.letter-analysis')

    // $FlowIgnore
    const context = canvas.getContext('2d')

    const {
      width,
      height,
    } = canvas

    const { data } = this.state

    const {
      maxCount,
    } = data

    const maxRad = 30
    const maxArea = maxRad * maxRad * Math.PI
    const bezierControl = 8
    let selectedNode

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    function getRadiusFromCount(count) {
      const area = maxArea / maxCount * count
      const rad = Math.sqrt(area / Math.PI)
      return rad
    }

    function getAlpha(count) {
      const alpha = 1 / data.maxRepetition * count
      return alpha
    }

    function getCircleTangents({
      cx,
      cy,
      radius,
      px,
      py,
    }) {
      // find tangents
      const dx = cx - px
      const dy = cy - py
      const dd = Math.sqrt(dx * dx + dy * dy)
      const a = Math.asin(radius / dd)
      const b = Math.atan2(dy, dx)

      const ta = { x: radius * Math.sin(b - a), y: radius * -Math.cos(b - a) }
      const tb = { x: radius * -Math.sin(b + a), y: radius * Math.cos(b + a) }

      return { ta, tb }
    }

    function drawLink(d) {
      context.save()
      context.beginPath()
      const targetNode = data.nodes.find(node => node.id === d.target.id)
      const targetRadius = getRadiusFromCount(targetNode.count)

      // bezier curve to target
      const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x)

      const distanceX = d.target.x - d.source.x
      const distanceY = d.target.y - d.source.y
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      const controlX = d.target.x - distance / 2 * Math.cos(angle - Math.PI / bezierControl)
      const controlY = d.target.y - distance / 2 * Math.sin(angle - Math.PI / bezierControl)

      const control2X = d.target.x - distance / 2 * Math.cos(angle - Math.PI / (bezierControl + 1))
      const control2Y = d.target.y - distance / 2 * Math.sin(angle - Math.PI / (bezierControl + 1))

      const tangents = getCircleTangents({
        cx: d.target.x,
        cy: d.target.y,
        radius: targetRadius,
        px: d.source.x,
        py: d.source.y,
      })
      // context.bezierCurveTo(d.source.x, d.source.y, controlX, controlY, d.target.x, d.target.y)

      const frontX = d.target.x + targetRadius * Math.cos(angle - Math.PI)
      const frontY = d.target.y + targetRadius * Math.sin(angle - Math.PI)

      context.moveTo(d.target.x, d.target.y)
      context.bezierCurveTo(frontX, frontY, control2X, control2Y, d.source.x, d.source.y)
      context.bezierCurveTo(d.source.x, d.source.y, controlX, controlY, d.target.x + tangents.tb.x, d.target.y + tangents.tb.y)
      context.moveTo(d.source.x, d.source.y)

      context.save()
      const lingrad = context.createLinearGradient(d.source.x, d.source.y, d.target.x, d.target.y)

      const alpha = getAlpha(d.repetition)
      lingrad.addColorStop(0, `rgba(0,0,255,${alpha})`)
      lingrad.addColorStop(1, `rgba(255,0,0,${alpha})`)

      context.fillStyle = lingrad
      context.fill()
      context.restore()
    }

    function drawNode(d) {
      const rad = getRadiusFromCount(d.count)

      context.save()
      context.beginPath()
      context.moveTo(d.x + rad, d.y)
      context.arc(d.x, d.y, rad, 0, 2 * Math.PI)

      context.fillStyle = selectedNode === d ? 'red' : '#333'
      context.fill()

      context.fillStyle = '#fff'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.font = `${1.3 * rad}px arial`
      context.fillText(d.id, d.x, d.y)
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
      data.links.forEach(drawLink)

      data.nodes.forEach(drawNode)

      context.restore()
    }

    if (data.links && data.nodes) {
      simulation
        .nodes(data.nodes)
        .on('tick', ticked)

      simulation
        .force('link')
        .distance(d => 1 / d.repetition * 300) // distance of the nodes
        .links(data.links)

      d3.select(canvas)
        .call(d3.drag()
          .container(canvas)
          .subject(dragsubject)
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended))
    }
  }

  render() {
    return (
      <Layout>
        <Header>
          Letter analyzer
        </Header>
        <p>This example takes any string as input, but only latinic caracters will be taken to account. The graph displays the order of the letters, so that character X was followed by character Y. The handling of the repetitions and the bi-directional links are made with custom functions.</p>
        <Form>
          <Form.TextArea
            onChange={this.handleChange}
            placeholder="Paste or type some text here"
          />
        </Form>
        <canvas
          className="letter-analysis"
          width="960"
          height="500"
        />
      </Layout>
    )
  }
}

export default IndexPage
