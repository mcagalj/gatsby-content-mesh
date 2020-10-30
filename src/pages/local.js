import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"
import Table from "../components/table"

const LocalPage = ({ data }) => {
  //   const { nodes: jsonData } = data.json
  const { nodes: yamlData } = data.yaml
  return (
    <Layout>
      <Title>Local content</Title>
      <section className="mb-10">
        <h3 className="font-light">Content from YAML files</h3>
        <Table
          headers={[
            { name: "Project", width: "w-1/5" },
            { name: "Students", width: "w-1/5" },
            { name: "Description", width: "w-2/5" },
            { name: "Links", width: "w-1/5" },
          ]}
          data={yamlData}
        />
      </section>
    </Layout>
  )
}

export default LocalPage

export const query = graphql`
  {
    yaml: allProjectsYaml {
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
      }
    }
  }
`
