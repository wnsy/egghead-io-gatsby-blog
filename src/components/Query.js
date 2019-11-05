import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDesc = ({data}) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'avenir',
    }}>
      <h3 style={{marginBottom: 0}}>
        {title}
      </h3>
      <p style={{marginTop: 0, opacity: 0.5}}>
        {description}
      </p>
    </div>
  )
}

const Query = () =>
  <StaticQuery query={ graphql`
        query {
          site {
            siteMetadata {
              title
              description
            },
          },
        }
      `
    }
    render = {
      data => <TitleAndDesc data={data}/>
    }
 />

export default Query
