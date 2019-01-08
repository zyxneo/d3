// @flow

import React, { Component } from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'

import Layout from '../components/Layout'
import LineChart from '../components/d3/LineChart'

type Props = {}

type State = {
  temps: {},
  city: string
}

class LineChartPage extends Component<Props, State> {
  props: Props

  state: State

  state = {
    temps: {},
    city: 'sf', // city whose temperatures to show
  };

  componentDidMount() {
    Promise.all([
      fetch(withPrefix('/db/sf.json')),
      fetch(withPrefix('/db/ny.json')),
      fetch(withPrefix('/db/am.json')),
    ]).then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([sf, ny, am]) => {
        sf.forEach(day => day.date = new Date(day.date))
        ny.forEach(day => day.date = new Date(day.date))
        am.forEach(day => day.date = new Date(day.date))

        this.setState({
          temps: { sf, ny, am },
        })
      })
  }

  updateCity = (e:Event) => {
    this.setState({ city: e.target.value })
  }

  render() {
    const { temps, city } = this.state
    const data = temps[city]

    return (
      <Layout>
        <h2>
          2017 Temperatures for
          <select name="city" onChange={this.updateCity}>
            {
              [
                { label: 'San Francisco', value: 'sf' },
                { label: 'New York', value: 'ny' },
                { label: 'Amsterdam', value: 'am' },
              ].map(option => (<option key={option.value} value={option.value}>{option.label}</option>))
            }
          </select>
        </h2>
        <p>
          *warning: these are <em>not</em> meant to be good examples of data visualizations,<br />
          but just to show the possibility of using D3 and React*
        </p>
        <p>
          This example is a copy of https://github.com/sxywu/react-d3-example
        </p>
        <LineChart data={data} />
      </Layout>
    )
  }
}

export default LineChartPage
