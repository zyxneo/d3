// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'

import Layout from '../components/Layout'

type Props = {
  canvasRef: HTMLElement,
}

// A utility function to draw a rectangle with rounded corners.

const roundedRect = (ctx, x, y, width, height, radius) => {
  ctx.moveTo(x, y + radius)
  ctx.lineTo(x, y + height - radius)
  ctx.arcTo(x, y + height, x + radius, y + height, radius)
  ctx.lineTo(x + width - radius, y + height)
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
  ctx.lineTo(x + width, y + radius)
  ctx.arcTo(x + width, y, x + width - radius, y, radius)
  ctx.lineTo(x + radius, y)
  ctx.arcTo(x, y, x, y + radius, radius)
}

class IndexPage extends React.Component<Props> {
  props: Props

  constructor(props: Props) {
    super(props)
    // $FlowIgnore
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    // Canvas tutorial
    // based on https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
    const canvas = document.getElementById('tutorial')

    // const context = this.canvasRef.current.getContext('2d')
    // $FlowIgnore
    const ctx = canvas.getContext('2d')

    // A fillStyle example
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)}, 0)`
        ctx.fillRect(j * 25, i * 25, 25, 25)
      }
    }

    // Drawing rectangles
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillRect(10, 10, 50, 50)

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(30, 30, 50, 50)

    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)

    // Drawing paths - smiley
    ctx.beginPath()
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // Outer circle
    ctx.moveTo(110, 75)
    ctx.arc(75, 75, 35, 0, Math.PI, false)  // Mouth (clockwise)
    ctx.moveTo(65, 65)
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true)  // Left eye
    ctx.moveTo(95, 65)
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true)  // Right eye
    ctx.stroke()

    // Create gradients
    const lingrad = ctx.createLinearGradient(0, 0, 0, 100)
    lingrad.addColorStop(0, '#00ABEB')
    lingrad.addColorStop(0.5, '#fff')
    lingrad.addColorStop(0.5, '#26C000')
    lingrad.addColorStop(1, '#fff')

    // Drawing paths
    ctx.beginPath()
    ctx.fillStyle = lingrad

    const combinedPath = new Path2D()
    roundedRect(combinedPath, 160, 10, 70, 70, 10)

    combinedPath.moveTo(220, 50)
    combinedPath.arc(200, 50, 20, 0, (Math.PI / 180) * 120)

    // Quadratric curves example
    combinedPath.quadraticCurveTo(150, 20, 200, 50)

    // Cubic curves example
    combinedPath.bezierCurveTo(170, 20, 230, 20, 220, 50)
    ctx.stroke(combinedPath)
    ctx.fill(combinedPath)

    const githubLogoPath = 'M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z'

    ctx.fillStyle = 'black'
    // $FlowIgnore
    const githubLogo = new Path2D(githubLogoPath)
    ctx.fill(githubLogo)

    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(240, 0)
    ctx.lineTo(240, 160)
    ctx.stroke()

    // A createLinearGradient example
    const lingrad2 = ctx.createLinearGradient(260, 20, 260, 100)
    lingrad2.addColorStop(0, '#00f')
    lingrad2.addColorStop(1, '#f00')

    ctx.strokeStyle = lingrad2
    ctx.lineCap = 'round'
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(260, 20)
    ctx.lineTo(260, 100)
    ctx.stroke()

    // A createRadialGradient example
    const radgrad = ctx.createRadialGradient(300, 45, 10, 307, 50, 30)
    radgrad.addColorStop(0, '#A7D30C')
    radgrad.addColorStop(0.9, '#019F62')
    radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)')

    ctx.fillStyle = radgrad
    ctx.fillRect(0, 0, 1500, 1500)

    // create new image object to use as pattern
    const img = new Image()
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png'
    img.onload = () => {
      // create pattern
      const ptrn = ctx.createPattern(img, 'repeat')
      ctx.fillStyle = ptrn
      ctx.fillRect(350, 0, 150, 150)
    }

    // A fillText example
    ctx.font = '48px sans-serif'
    ctx.textAlign = 'start' // start, end, left, right or center
    ctx.direction = 'rtl' // ltr, rtl, inherit
    ctx.textBaseline = 'hanging' // top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.
    // const textMeasurements = ctx.measureText('This is a test') // TextMetrics object
    // console.info(textMeasurements.width)


    const docImg = document.images[0]
    docImg.onload = () => {
      const docptrn = ctx.createPattern(docImg, 'repeat')
      ctx.strokeStyle = docptrn
      ctx.lineJoin = 'round' // round, bevel and miter
      ctx.strokeText('This is a test', 170, 100)
      ctx.fillStyle = 'black'
      ctx.fillText('This is a test', 170, 100)
    }

    const squareWidth = 25
    const squareHeigh = 25
    const squarePadding = 25
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        ctx.save()
        ctx.fillStyle = `rgb(${100 * i}, ${255 - (51 * j)}, 255)`

        // translate to rectangle center
        // x = x + 0.5 * width
        // y = y + 0.5 * height
        ctx.translate(500 + j * (squareWidth + squarePadding) + 0.5 * squareWidth, 10 + i * (squareHeigh + squarePadding) + 0.5 * squareHeigh)

        // rotate
        ctx.rotate((Math.PI / 180) * (i + j) * 11)

        // translate back
        ctx.translate(-0.5 * squareWidth, -0.5 * squareHeigh)
        ctx.fillRect(0, 0, squareWidth, squareHeigh)
        ctx.restore()
      }
    }
  }

  render() {
    return (
      <Layout>
        <img src={withPrefix('images/pages/simple-bar-chart.png')} style={{ display: 'none' }} />
        <canvas
          id="tutorial"
          width="900"
          height="150"
        >
          <div>Providing fallback content is very straightforward: just insert the alternate content inside the canvas element. Browsers that do not support canvas will ignore the container and render the fallback content inside it. Browsers that do support canvas will ignore the content inside the container, and just render the canvas normally.</div>
        </canvas>
      </Layout>
    )
  }
}

export default IndexPage
