// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import * as d3 from 'd3'

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
  text: string;
  data: {
    nodes: Array<Node>,
    links: Array<Link>,
    maxCount: number,
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
      text: '',
      data: {},
    }
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    this.updateBar()
  }

  handleChange(e:Event) {
    this.setState({
      text: e.target.value,
    })
  }

  analyze() {
    const { text } = this.state
    const letterArray = Array.from(text)
    const data = {
      nodes: [],
      links: [],
      maxCount: 0,
      maxRepetition: 0,
    }
    letterArray.map((letter, i) => {
      // adding nodes
      let nodeExist = false
      data.nodes.map((node) => {
        if (node.id === letter) {
          nodeExist = true
          // data.maxCount = Math.max(node.count += 1, data.maxCount)
          // console.log(data.maxCount)
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
          return link.repetition += 1
        }
      })
      if (!linkExist && typeof letterArray[i + 1] !== 'undefined') {
        data.links.push({ source: letter, target: letterArray[i + 1], repetition: 1 })
      }
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
    const bezierControl = 8

    let selectedNode

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))

    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y)

      // bezier curve to target
      const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x)

      const distanceX = d.target.x - d.source.x
      const distanceY = d.target.y - d.source.y
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY) / 2

      const controlX = d.target.x - distance * Math.cos(angle - Math.PI / bezierControl)
      const controlY = d.target.y - distance * Math.sin(angle - Math.PI / bezierControl)
      context.bezierCurveTo(d.source.x, d.source.y, controlX, controlY, d.target.x, d.target.y)
    }


    function drawNode(d) {
      const rad = maxRad / maxCount * d.count
      const maxWidth = 30
      const textPadding = 6

      context.save()
      context.beginPath()
      context.lineWidth = 2
      context.strokeStyle = '#fff'
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
      data.links.forEach(drawLink)
      context.lineWidth = 0.5
      context.strokeStyle = '#333'
      context.stroke()

      data.nodes.forEach(drawNode)

      context.restore()
    }

    if (data.links && data.nodes) {
      simulation
        .nodes(data.nodes)
        .on('tick', ticked)

      simulation
        .force('link')
        .distance(d => d.repetition * 50) // distance of the nodes
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
    const { data } = this.state
    return (
      <Layout>
        <textarea
          onChange={this.handleChange}
        />
        <button
          onClick={this.analyze}
          type="button"
        >
          Analyze
        </button>
        { data.a }
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
