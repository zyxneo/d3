// @flow

import React from 'react'
// $FlowIgnore
import { withPrefix } from 'gatsby-link'
// $FlowIgnore
import { Link } from 'gatsby'
import {
  Button,
  Card,
  Icon,
  Image,
  // $FlowIgnore
} from 'semantic-ui-react'

type PageCardProps = {
  id: string,
  header: string,
  type: string,
  originalUrl?: string,
  description?: string,
}

const PageCard = ({
  id,
  header,
  type,
  originalUrl,
  description,
}: PageCardProps) => (
  <Card>
    <Image src={withPrefix(`images/pages/${id}.png`)} />
    <Card.Content>
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{type}</Card.Meta>
      {originalUrl && <a href={originalUrl}>source</a>}
      {description && <Card.Description>{description}</Card.Description>}
    </Card.Content>
    <Card.Content extra>
      <Link to={`/${id}`}>
        <Button icon labelPosition="right" floated="right" color="blue">
          Check it
          <Icon name="right arrow" />
        </Button>
      </Link>
    </Card.Content>
  </Card>
)

export default PageCard
