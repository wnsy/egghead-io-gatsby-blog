/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
  ]

}
