// node module sys: ea. file = separate module
// https://nodejs.org/api/modules.html#modules_modules
const path = require('path')

// is an object. it exposes whatever you assigned to it as a module.
// because it's an obj, can attach properties / methods to it
// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
// about createPages from Data Programmatically:
// https://www.gatsbyjs.org/docs/programmatically-create-pages-from-data/
// Tell plugins to add pages: https://www.gatsbyjs.org/docs/node-apis/#createPages
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplatePath = path.resolve(`src/templates/blogPost.js`)

    resolve(graphql`
      query Pages {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
      `
    ).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplatePath,
            context: {
              pathSlug: path
            }
          })
          resolve()
        })
      }
    )
  })
}
