import React from "react"
import { graphql, navigate } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../../../components/layout"

const TestPage = ({ data, params }) => {
  // This is an ugly hack...
  if (params.frontmatter__slug === "null") {
    return (
      <Layout>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
  }

  const { title, author } = data.post.frontmatter

  return (
    <Layout>
      <div style={{ maxWidth: "70ch" }} className="mx-auto">
        <h1 className="font-semibold mb-1">{title}</h1>
        <h4 className="font-light">Author: {author}</h4>
        <MDXRenderer>{data.post.body}</MDXRenderer>
        {/* Linking to the next and previous posts is tricky with the file system route api */}
      </div>
    </Layout>
  )
}

export default TestPage

export const query = graphql`
  query($id: String) {
    post: mdx(id: { eq: $id }, frontmatter: { slug: { ne: null } }) {
      frontmatter {
        author
        title
        slug
      }
      body
    }
  }
`
