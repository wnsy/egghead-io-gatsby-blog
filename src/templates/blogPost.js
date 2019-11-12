import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = ({ data, pageContext }) => {
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html
  const { prev, next } = pageContext

  return(
    <div style={style}>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{__html: html}}
      />
      {prev &&
        <Link to={prev.frontmatter.path}>
          Prev: {`${prev.frontmatter.title}`}
        </Link>
      }

      {next &&
        <Link to={next.frontmatter.path}>
          Next: {`${next.frontmatter.title}`}
        </Link>
      }
    </div>
  )
}

// specifying a template: https://www.gatsbyjs.org/docs/programmatically-create-pages-from-data/
// query with $pathSlug value from our context as an arg
// meaning it will return only the data that matches that
// specific page. Result: can provide the title & html
// from the matching markdownRemark record to our component.
export const templateQuery = graphql`
    query($pathSlug: String!){
      markdownRemark(frontmatter: {path:
        {eq: $pathSlug}
      }) {
      html
      frontmatter {
        title
      }
    }
  }
`

const style = {
  fontFamily: 'avenir'
}

export default Template
