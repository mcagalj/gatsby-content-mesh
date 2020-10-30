import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"
import Table from "../components/table"

const LocalPage = ({ data }) => {
  const { nodes: jsonData } = data.json
  //   const { nodes: yamlData } = data.yaml
  return (
    <Layout>
      <Title>Local content</Title>
      <section className="mb-10">
        <h3 className="font-light">Content from JSON files</h3>
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
  }
`
