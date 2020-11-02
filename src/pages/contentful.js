import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Title from "../components/title"

const ContentfulPage = ({ data }) => {
  const { nodes: lecturers } = data.lecturers
  console.log(lecturers)
  return (
    <Layout>
      <Title>Content from remote source (Contentful)</Title>
      {lecturers.map(lecturer => {
        return (
          <div key={lecturer.id} className="mb-20">
            <h3 className="font-semibold mt-4 mb-1 text-purple-700">
              {lecturer.fullName}
            </h3>
            <p>{lecturer.email}</p>
            <Img fixed={lecturer.photo.fixed} />
            <p>{lecturer.role}</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default ContentfulPage

export const query = graphql`
  {
    lecturers: allContentfulLecturer {
      nodes {
        id
        fullName
        email: eMail
        role
        photo {
          fixed(width: 100) {
            ...GatsbyContentfulFixed
          }
        }
      }
    }
  }
`
