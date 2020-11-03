import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"

const GoogleSheetPage = ({ data }) => {
  const { nodes: articles } = data.articles
  return (
    <Layout>
      <Title>Content from remote source (Google Sheet)</Title>
      {articles.map(article => {
        return (
          <div key={article.id} className="mb-12">
            <a href={article.url} className="p-1 pl-0">
              {article.title}
            </a>
            <div>{article.author}</div>
            <div className="flex">
              <div>
                {article.conference ? article.conference : article.journal},{" "}
                {article.date}
              </div>
              {article.selected === "TRUE" ? (
                <div className="p-0 ml-2 text-center text-xs w-4/12 text-white bg-purple-700 rounded-sm overflow-hidden whitespace-no-wrap overflow-auto">
                  proud of
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default GoogleSheetPage

export const query = graphql`
  {
    articles: allGoogleSpreadsheetArticles {
      nodes {
        author
        conference
        date
        id
        journal
        selected
        title
        url
      }
    }
  }
`
