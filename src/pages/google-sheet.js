import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"
import useHasMounted from "../hooks/useHasMounted"

function getSearchResults(query) {
  const index = window.__FLEXSEARCH__.en.index
  const store = window.__FLEXSEARCH__.en.store
  if (!query || !index) {
    return []
  } else {
    let results = []
    // search the indexed fields
    Object.keys(index).forEach(idx => {
      results.push(...index[idx].values.search(query)) // more search options at https://github.com/nextapps-de/flexsearch#index.search
    })

    // find the unique ids of the nodes
    results = Array.from(new Set(results))

    // return the corresponding nodes in the store
    const nodes = store
      .filter(node => (results.includes(node.id) ? node : null))
      .map(node => node.node)

    return nodes
  }
}

const DisplayArticles = ({ articles }) =>
  articles.map(article => {
    return (
      <div key={article.id} className="mb-12 relative">
        <a
          href={article.url}
          className={`p-1 pl-0 ${article.selected === "TRUE" ? "ml-8" : ""}`}
        >
          {article.title}
        </a>
        <div>{article.author}</div>
        <div className="flex">
          <div>
            {article.conference ? article.conference : article.journal},{" "}
            {article.date}
          </div>
          {article.selected === "TRUE" ? (
            <div className="absolute top-0 left-0 text-center font-bold text-xs w-5 h-5 text-white bg-purple-800 rounded-sm overflow-hidden whitespace-no-wrap overflow-auto" />
          ) : null}
        </div>
      </div>
    )
  })

const getYears = items => {
  const years = items.map(item => item.date)
  let uniqueYears = new Set(years)
  uniqueYears = [...Array.from(uniqueYears), "all years"]
  return uniqueYears
}

const GoogleSheetPage = ({ data }) => {
  // Do not render this component when doing server-side rendering;
  // the object "window" is defined only in the browser (client-side)

  const { nodes: articles } = data.articles
  const [query, setQuery] = useState("")
  const memoizedYears = useMemo(() => getYears(articles), [articles])
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return null
  }

  const filtered_articles = getSearchResults(query)

  return (
    <Layout>
      <Title>Content from remote source (Google Sheet)</Title>

      <div className="my-8 mx-auto sm:w-full md:w-2/3">
        <div className="relative mx-auto my-4 w-full">
          <input
            type="search"
            className="bg-purple shadow rounded border-2 border-gray-400 focus:outline-none focus:border-purple-600 p-3 pr-10 w-full"
            placeholder="Search by title..."
            value={query || ""}
            onChange={event => setQuery(event.target.value)}
          />
          <div
            className="absolute text-purple-lighter right-0 pr-4 fill-current text-purple-600"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <svg
              version="1.1"
              className="h-4 text-dark"
              x="0"
              y="0"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              enableBackground="new 0 0 24 24"
            >
              <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z" />
            </svg>
          </div>
        </div>

        <ul className="mx-auto w-full flex flex-wrap justify-center">
          {memoizedYears.map(year => (
            <button
              key={year}
              className={`m-1 bg-purple-400 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none ${
                query === year ? "bg-purple-700" : ""
              } ${year === "all years" && query === "" ? "bg-purple-700" : ""}`}
              onClick={() => setQuery(year === "all years" ? "" : year)}
            >
              {year}
            </button>
          ))}
        </ul>
      </div>

      {query && filtered_articles.length > 0 ? (
        <DisplayArticles articles={filtered_articles} />
      ) : null}
      {query && filtered_articles.length === 0 ? (
        <p>
          No results for{" "}
          <span className="text-purple-600 font-semibold">{query}</span>
        </p>
      ) : null}
      {!query && <DisplayArticles articles={articles} />}
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
