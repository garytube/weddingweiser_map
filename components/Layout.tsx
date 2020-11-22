import React, { FunctionComponent } from "react"

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="antialiased text-gray-900 bg-wedding flex items-center justify-center min-h-screen">
      {children}
    </div>
  )
}

export default Layout