import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Title from "../components/title"
import Table from "../components/table"

const LocalPage = ({ data }) => {
  const { nodes: jsonData } = data.json
  const { frontmatter: mdFrontmatter } = data.markdown
  const { image: mdImage } = data.markdown.frontmatter
  const { body: mdBody } = data.markdown
  const { nodes: dbUsers } = data.db.allUsers
  //   const { nodes: yamlData } = data.yaml
  return (
    <Layout>
      <Title>Local content</Title>

      <section className="mb-24">
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

      <section className="mb-24">
        <h3 className="font-light text-red-500">
          Content from markdown/mdx files
        </h3>
        <h1 className="font-semibold">{mdFrontmatter.title}</h1>
        <p>{mdFrontmatter.description}</p>
        <Img fluid={mdImage.childImageSharp.fluid} className="w-9/12 mx-auto" />
        <MDXRenderer>{mdBody}</MDXRenderer>
      </section>

      <section className="mb-24">
        <h3 className="font-light text-red-500">
          Content from (PostgreSQL) database
        </h3>
        {dbUsers.map(user => {
          const {
            username,
            medicalTestsByUserId: { nodes: tests },
          } = user
          const testsList = tests.map(test => (
            <li key={test.id}>
              {test.name}{" "}
              <span className="text-gray-500">({test.timestamp})</span>
            </li>
          ))
          return (
            <div key={user.id}>
              <h3 className="font-semibold mt-4 mb-1 text-purple-700">
                {username}
              </h3>
              <ol className="list-decimal">{testsList}</ol>
            </div>
          )
        })}
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
        description
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

    db: postgres {
      allUsers(first: 4) {
        nodes {
          username
          id
          medicalTestsByUserId {
            nodes {
              id
              name
              timestamp
            }
          }
        }
      }
    }
  }
`
