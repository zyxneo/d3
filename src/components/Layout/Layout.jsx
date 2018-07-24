// @flow

import React from 'react'
import type { Node } from 'react'
// $FlowIgnore
import Helmet from 'react-helmet'
import {
  Container,
} from 'semantic-ui-react'

import Footer from '../Footer'
import Header from '../Header'


// $FlowIgnore
import 'semantic-ui-css/semantic.min.css'

// $FlowIgnore
import './index.scss'

type Props = {
  children: Node
}

const Layout = (props: Props): Node => (
  <div>
    <Helmet
      title="D3 examples"
      meta={[
        { name: 'description', content: 'D3 examples and tutorials in built with Gatsby react' },
        { name: 'keywords', content: 'D3, React' },
      ]}
    />
    <Header />
    <Container>
      {props.children}
    </Container>
    <Footer />
  </div>
)

export default Layout
