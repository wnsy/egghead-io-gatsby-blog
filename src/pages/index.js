import React from 'react'
import Query from '../components/Query'
import { graphql, Link } from 'gatsby'

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <Query />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'avenir',
       }}
      >
      {edges.map(
        edge => {
          const { frontmatter } = edge.node
          const { wordCount } = edge.node
          // const { excerpt } = edge.node
          return (
            <div key={frontmatter.path}
              style={{
                marginBottom: '1rem',
              }}
            >
              <Link to={frontmatter.path}>
                <br />{frontmatter.title}
              </Link>
              <br />{frontmatter.date}
              {/* <br />{excerpt} */}
              <br />word count: {wordCount.words}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const query = graphql`
  query HomePageQuery {
    allMarkdownRemark (
      sort: {
        order: [DESC],
        fields: [frontmatter___date]
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "MMMM DD, YYYY")
          }
          # excerpt
          wordCount {
            paragraphs
            sentences
            words
          }
        }
      }
    }
  }
`

export default Layout
