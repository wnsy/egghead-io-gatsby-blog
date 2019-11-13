/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
 require('dotenv').config({
   path: `.env`,
 })

module.exports = {
  siteMetadata: {
    title: 'Blog using Gatsby',
    description: 'build a blog with React and Markdown using Gatsby'
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      // The following sets up the Jekyll pattern of having a
      // "pages" directory for Markdown files and a "data" directory
      // for `.json`, `.yaml`, `.csv`.
      resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `${__dirname}/src/pages/`,
        },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `data`,
    //     path: `${__dirname}/src/data/`,
    //     ignore: [`**/\.*`], // ignore files starting with a dot
    //   },
    // },

    // Set a link resolver function used to process links in your content.
     // Fields with rich text formatting or links to internal content use this
     // function to generate the correct link URL.
     // The document node, field key (i.e. API ID), and field value are
     // provided to the function, as seen below. This allows you to use
     // different link resolver logic for each field if necessary.
     // See: https://prismic.io/docs/javascript/query-the-api/link-resolving
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `${process.env.PRISMIC_REPOSITORY_NAME}`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
  ]

}
