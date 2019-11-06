// create slugs: as the logic to create slugs from file names
// can get tricky, the plugin has a function to create slugs
// https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    // console.log("createFilePath", createFilePath({ node, getNode, basePath: `pages` }))
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    // console.log(node.internal.type)
    // createNodeField lets us create additional fields on nodes created by
    // other plugins. Only ori. creator of a node can directly modify the
    // node–all other plugins (incl. this file) must use this function to
    // create additional fields
    // tl;dr: Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
}
