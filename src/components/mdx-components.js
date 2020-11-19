import React from "react"

export default {
  h2: props => (
    <h2
      className="font-light text-purple-700 border-b-2 border-purple-700 mt-8 mb-2 p-2 pl-0"
      {...props}
    />
  ),
  h3: props => <h3 className="font-light my-4" {...props} />,
  p: props => <p className="font-light" {...props} />,
  hr: () => <hr className="border-red-100" />,
  a: props => <a className="p-0" {...props} />,
  ol: props => <ol className="font-light list-decimal" {...props} />,
  blockquote: props => (
    <blockquote
      className="p-2 mx-6 bg-gray-100 mb-4 border-l-4 border-gray-400 italic"
      {...props}
    />
  ),
}
