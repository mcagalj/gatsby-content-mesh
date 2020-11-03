import React from "react"
import Img from "gatsby-image"

const Table = ({ headers, data }) => (
  <table className="table-auto overflow-x-auto">
    <thead className="bg-purple-700 text-white">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className={`${header.width} py-3 px-2 uppercase font-semibold text-sm`}
          >
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="text-gray-800">
      {data.map((item, index) => {
        return (
          <tr key={item.id} className={`${index % 2 ? "bg-purple-100" : ""}`}>
            <td className="py-3 px-2overflow-x-auto  whitespace-no-wrap">
              {item.project}
            </td>
            <td className="text-left py-3 px-2">
              {item.students.map(student => (
                <div key={student.student} className="mr-4">
                  <div className="flex flex-no-wrap overflow-x-auto whitespace-no-wrap">
                    <Img
                      fixed={item.image.childImageSharp.fixed}
                      alt="Student"
                      className="mb-2"
                    />{" "}
                    {student.student}
                  </div>
                </div>
              ))}
            </td>
            <td className="py-3 px-2">{item.description}</td>
            <td className="py-3 px-2">
              <a href={item.links.github}>GitHub</a>
              <br />
              <br />
              <a href={item.links.production}>Production</a>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default Table
