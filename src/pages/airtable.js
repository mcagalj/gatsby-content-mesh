import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Title from "../components/title"

const AirtablePage = ({ data }) => {
  const { products } = data.productsTable
  return (
    <Layout>
      <Title>Content from remote source (Airtable)</Title>
      {products.map(({ product }) => (
        <div key={product.id} className="mb-20">
          <h3 className="font-semibold mt-4 mb-1 text-purple-700">
            {product.data.name}
          </h3>
          <p>{product.data.description}</p>
          <div className="text-center overflow-auto">
            <Img fixed={product.data.image.localFiles[0].sharp.fixed} />
          </div>
          <div className="p-2 text-center w-auto text-white bg-purple-700 border rounded-lg overflow-hidden">
            {product.data.price} $
          </div>
          <div className="p-2 text-center w-auto text-white bg-orange-500 border rounded-lg overflow-hidden">
            {product.data.categories}
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default AirtablePage

export const query = graphql`
  query AirtableProductsQuery {
    productsTable: allAirtable(filter: { table: { eq: "Products" } }) {
      products: edges {
        product: node {
          id: recordId
          data {
            name
            description
            price
            image_credit
            image {
              localFiles {
                sharp: childImageSharp {
                  fixed(width: 500, height: 400, cropFocus: CENTER) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
            categories
          }
        }
      }
    }
  }
`
