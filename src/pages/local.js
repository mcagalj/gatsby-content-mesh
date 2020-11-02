import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Title from "../components/title"
import Table from "../components/table"

const LocalPage = ({ data }) => {
  const { nodes: jsonData } = data.json
  const { frontmatter: markdownFrontmatter } = data.markdown
  const { image: markdownImage } = data.markdown.frontmatter
  const { body: markdownBody } = data.markdown
  //   const { nodes: yamlData } = data.yaml
  return (
    <Layout>
      <Title>Local content</Title>

      <section className="mb-10">
        <h3 className="font-light text-red-500">Content from JSON files</h3>
        <Table
          headers={[
            { name: "Project", width: "w-2/12" },
            { name: "Students", width: "w-3/12" },
            { name: "Description", width: "w-5/12" },
            { name: "Links", width: "w-2/12" },
          ]}
          data={jsonData}
        />
      </section>
      <section className="mb-10">
        <h3 className="font-light text-red-500">
          Content from markdown/mdx files
        </h3>
        <h1 className="font-semibold">{markdownFrontmatter.title}</h1>
        <Img
          fluid={markdownImage.childImageSharp.fluid}
          className="w-9/12 mx-auto"
        />
        <MDXRenderer>{markdownBody}</MDXRenderer>
      </section>
    </Layout>
  )
}

export default LocalPage

export const query = graphql`
  {
    json: allProjectsJson {
      nodes {
        id
        project
        description
        students {
          student
        }
        links {
          github
          production
        }
        image {
          childImageSharp {
            fixed(width: 50) {
              src
            }
          }
        }
      }
    }

    markdown: mdx(fileAbsolutePath: { regex: "/projects.md/" }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`
