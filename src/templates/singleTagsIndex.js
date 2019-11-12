import React from 'react'
import { Link } from 'gatsby'

// Use PageContext to Display Tags in Gatsby

const SingleTagsTemplate = ({ pageContext }) => {
  const { posts, tagName } = pageContext

  return(
    <div style={style}>
      <h4>Post(s) about: {`${tagName}`}</h4>
     {
       posts.map((post, index) => {
         return(
           <div key={index}>
             <li>
               <Link to={post.frontmatter.path}>
                 {`${post.frontmatter.title}`}
              </Link>
             </li>
           </div>
         )
       })
     }
    </div>
  )
}

const style = {
  fontFamily: 'avenir',
}

export default SingleTagsTemplate
