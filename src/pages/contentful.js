import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"

const ContentfulPage = ({}) => {
  return (
    <Layout>
      <Title>Content from remote source (Contentful)</Title>
    </Layout>
  )
}

export default ContentfulPage
