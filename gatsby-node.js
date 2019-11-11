// node module sys: ea. file = separate module
// https://nodejs.org/api/modules.html#modules_modules
const path = require('path')

const createTagPages = ({ createPages, posts }) => {
  const allTagsIndexTemplate = path.resolve(`src/templates/allTagsIndex.js`)
  const allSingleTagsTemplate = path.resolve(`src/templates/singleTagsIndex.js`)

  // need to create a holder/empty obj to keep the key: tag
  const postsByTag = {}

  console.log("posts", posts)

  posts.forEach(({ node }) => {
    console.log("node", node)
    if(node.frontmatter.tags) {
      node.frontmatter.tags
    }
  })


}

// is an object. it exposes whatever you assigned to it as a module.
// because it's an obj, can attach properties / methods to it
// https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
// about createPages from Data Programmatically:
// https://www.gatsbyjs.org/docs/programmatically-create-pages-from-data/
// Tell plugins to add pages: https://www.gatsbyjs.org/docs/node-apis/#createPages
exports.createPages = (({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplatePath = path.resolve(`src/templates/blogPost.js`)
    const pageQuery = graphql(
      `
      query Pages {
        allMarkdownRemark(sort:
          {order: ASC,
          fields: frontmatter___date}) {
          edges {
            node {
              frontmatter {
                path
                title
              }
            }
          }
        }
      }
      `
    )
    resolve(pageQuery
      .then(result => {
        const posts = result.data.allMarkdownRemark.edges

        console.log("post", posts)
        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplatePath,
            context: {
              pathSlug: path,
              prev: index === 0 ? null : posts[index-1].node,
              next: index === (posts.length - 1) ? null : posts[index+1].node
            },
          })
          resolve()
        })
      })
    )
  })
})
