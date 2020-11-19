import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"

export default function BlogPage({ data }) {
  return (
    <Layout>
      <h1>Blog index</h1>
      <ul>
        {data.blog.nodes.map(
          post =>
            post.frontmatter.slug && (
              <li key={post.frontmatter.slug}>
                <Link to={`/blog/${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                </Link>
              </li>
            )
        )}
      </ul>
    </Layout>
  )
}
export const query = graphql`
  query {
    blog: allMdx {
      nodes {
        id
        frontmatter {
          slug
          title
        }
      }
    }
  }
`
