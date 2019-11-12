// node module sys: ea. file = separate module
// https://nodejs.org/api/modules.html#modules_modules
const path = require('path')

const createTagPages = ( createPage, posts ) => {
  const allTagsIndexTemplate = path.resolve(`src/templates/allTagsIndex.js`)
  const allSingleTagsTemplate = path.resolve(`src/templates/singleTagsIndex.js`)

  // need to create a holder/empty obj to keep the key: tag
  // so that it will be like 1: tag1, etc
  const postsByTag = {}

  console.log("posts", posts)

  posts.forEach(({ node }) => {
    console.log("node", node)
    if(node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        //if there's not that postsByTag as the key then create a new one
        if(!postsByTag[tag]) {
          postsByTag[tag] = []
        }
        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  createPage({
    path: '/tags', //node.frontmatter.tags,
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort()
    }
  })

  tags.forEach(tagName => {
    // want to get the posts, then the tag name(s)
    const posts = postsByTag[tagName]

    createPage({
      path: `tags/${tagName}`,
      component: allSingleTagsTemplate,
      context: {
        posts,
        tagName
      },
    })

  })
}

// exports is an object. it exposes whatever you assigned to it as a module.
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
                tags
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

        createTagPages(createPage, posts)
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
