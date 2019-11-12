import React from 'react'
// import { Link } from 'gatsby'

// Use PageContext to Display Tags in Gatsby

const AllTagsTemplate = ({ pageContext }) => {
  // console.log("data alltagsindex", data)

  const { tags } = pageContext

  return(
    <div style={style}>
      {
        tags.map((tagName, index) => {
          return(
            <li key={index}>
              <a href={`tags/${tagName}`}>
                {tagName}
              </a>
            </li>
          )
        })
      }
    </div>
  )
}

const style = {
  fontFamily: 'avenir',
  // activeClassName="active" https://www.gatsbyjs.org/docs/gatsby-link/
}

export default AllTagsTemplate
