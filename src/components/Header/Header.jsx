// @flow

import React from 'react'
import Link from 'gatsby-link'

import {
  Container,
  Dropdown,
  Menu,
} from 'semantic-ui-react'

const Header = () => (
  <Menu size="large">
    <Container>
      <Menu.Item as={Link} to="/">Home</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Menu position="right">
          <Dropdown item text="Examples">
            <Dropdown.Menu>
              <Dropdown.Item  as={Link} to="/simple-bar-chart">simple-bar-chart</Dropdown.Item>
              <Dropdown.Item  as={Link} to="/svg-bar-chart">svg-bar-chart</Dropdown.Item>
              <Dropdown.Item  as={Link} to="/svg-bar-chart-vertical">svg-bar-chart-vertical</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>

      </Menu.Menu>
    </Container>
  </Menu>
)

export default Header
