import React from 'react'
import { graphql } from 'gatsby'

const Template = (props) =>
  export const templateQuery = graphql(`
    query Template {
      markdownRemark {
        frontmatter {
          path
        }
      }
    }
  `
  )
  <div>
    Blog post here
    {console.log("props from blogpost page", props)}
  </div>

export default Template
