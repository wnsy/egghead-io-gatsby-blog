import React from 'react'
import { graphql } from 'gatsby'

const Template = (props) =>
  <div>
    Blog post here
    {console.log("props from blogpost page", props)}
  </div>

export default Template
