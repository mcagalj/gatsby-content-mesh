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
    <ul>
      {navbarItems.map(item => (
        <li key={item.text}>
          <Link to={item.path} activeClassName={"active"}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Navbar
