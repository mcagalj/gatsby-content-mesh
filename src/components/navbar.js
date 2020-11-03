import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Navbar = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          navbarItems: navbar {
            path
            text
          }
        }
      }
    }
  `)

  const { navbarItems } = data.site.siteMetadata
  return (
    <ul className="flex flex-no-wrap mb-4 overflow-x-auto">
      {navbarItems.map(item => (
        <li key={item.text} className="flex-auto whitespace-no-wrap p-2">
          <Link to={item.path} activeClassName={"active"}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar
