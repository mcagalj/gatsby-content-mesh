import React from "react"
import Layout from "../components/layout"

const LocalPage = ({ data }) => {
  const { nodes: jsonData } = data.json
  return (
    <Layout>
      <h1>Local content</h1>
      <h2>Content from JSON files</h2>
      <ol>
        {jsonData.map(item => {
          return (
            <li>
              {item.message} -- {item.author}
            </li>
          )
        })}
      </ol>
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
