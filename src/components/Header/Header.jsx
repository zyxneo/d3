// @flow

import React from 'react'
// $FlowIgnore
import Link from 'gatsby-link'

import {
  Container,
  Menu,
  // $FlowIgnore
} from 'semantic-ui-react'

const Header = () => (
  <Menu size="large">
    <Container>
      <Menu.Item as={Link} to="/">Home</Menu.Item>


    </Container>
  </Menu>
)

export default Header
