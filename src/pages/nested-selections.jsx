// @flow

import React from 'react'
// $FlowIgnore
import * as d3 from 'd3'

import Layout from '../components/Layout'
// $FlowIgnore
import './nested-selections.scss'

type Props = {
  data: Array<Array<number>>,
}

type State = {
  data: Array<Array<number>>,
}

class IndexPage extends React.Component<Props, State> {
  props: Props

  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      data: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ],
    }
  }

  componentDidMount() {
    this.updateTable()
  }

  componentDidUpdate() {
    this.updateTable()
  }

  updateTable = () => {
    // based on https://bost.ocks.org/mike/nest/
    const { data } = this.state

    const wrapper = d3.select('.nested-selections')

    const table = wrapper.append('table')
      .attr('class', 'nested-selections-table')

    const tr = table.selectAll('tr')
      .data(data)
      .enter().append('tr')
      /* eslint-disable no-confusing-arrow */
      .attr('class', (d, i) => i % 3 === 2 ? 'selected' : null)

    tr.selectAll('td')
      .data(d => d)
      .enter().append('td')
      .attr('class', (d, i) => i % 2 ? 'selected' : null)
      .text((d, i) => `${d} [${i}]`)
  }

  render() {
    return (
      <Layout>
        <div className="nested-selections" />
      </Layout>
    )
  }
}

export default IndexPage
