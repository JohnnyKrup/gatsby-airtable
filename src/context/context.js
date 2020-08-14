import React, { useState } from "react"
import sublinks from "../constants/links"

const GatsbyContext = React.createContext()

// Provider, Consumer

// this is not the same as the Provider above, this is a component
const GatsbyProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // we are not going to use the setLinks update functionality,
  // this useState variable is only used to distribute the sublinks
  const [links, setLinks] = useState(sublinks)

  const showSidebar = () => {
    setIsSidebarOpen(true)
  }

  const hideSidebar = () => {
    setIsSidebarOpen(false)
  }

  /**
   * because of ES6 we do not need to have the objectName:value pair
   * if the name and the value are the same you can use just the single variable name
   * before: 'isSidebarOpen:isSidebarOpen' now with ES6 => 'isSidebarOpen'
   *
   * to pass an object into the value property, we have to use the {{}} inside
   */
  return (
    <GatsbyContext.Provider
      value={{ isSidebarOpen, links, showSidebar, hideSidebar }}
    >
      {children}
    </GatsbyContext.Provider>
  )
}

export { GatsbyContext, GatsbyProvider }
