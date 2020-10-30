import React from "react"

const Table = ({ headers, data }) => (
  <table className="min-w-full">
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
            <td className="py-3 px-2">{item.project}</td>
            <td className="w-1/5 text-left py-3 px-2">
              {item.students.map(student => (
                <div key={student.student} className="mr-4">
                  {student.student}
                </div>
              ))}
            </td>
            <td className="py-3 px-2">{item.description}</td>
            <td className="py-3 px-2">
              <a href={item.links.github}>GitHub</a>
              <a href={item.links.production}>Production</a>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default Table
