import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"

const LocalPage = ({ data }) => {
  const { nodes: jsonData } = data.json
  return (
    <Layout>
      <Title>Local content</Title>
      <section className="border-gray-500">
        <h3 className="font-light">Content from JSON files</h3>
        <ol className="list-decimal">
          {jsonData.map(item => {
            return (
              <li>
                {item.message} -- {item.author}
              </li>
            )
          })}
        </ol>
      </section>
    </Layout>
  )
}

export default LocalPage

export const query = graphql`
  {
    json: allJsonJson {
      nodes {
        id
        author
        message
      }
    }
  }
`
