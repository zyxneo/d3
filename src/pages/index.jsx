// @flow

import React from 'react'
import { Card } from 'semantic-ui-react'
import Layout from '../components/Layout'
import PageCard from '../components/PageCard'
import pagesJson from '../../static/db/pages.json'


const IndexPage = () => (
  <Layout>
    <Card.Group>
      {
        pagesJson.pages.map(
          page => (
            <PageCard key={page.id} {...page} />
          ),
        )
      }
    </Card.Group>
  </Layout>
)

export default IndexPage
