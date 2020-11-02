import React from "react"

export default {
  h2: props => (
    <h2
      className="font-light text-purple-700 border-b-2 border-purple-700 mt-8 mb-2 p-2 pl-0"
      {...props}
    />
  ),
  h3: props => <h3 className="font-light mt-4 mb-1" {...props} />,
  p: props => <p className="font-light m-0" {...props} />,
  hr: () => <hr className="border-red-100" />,
  a: props => <a className="p-0" {...props} />,
}
