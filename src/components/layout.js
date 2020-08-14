/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { GatsbyContext } from "../context/context"

const Layout = ({ children }) => {
  /**
   * in context.js we are passing the 'isSidebarOpen' and the 'links' properties via an object
   * that's why we can destructure the return of the useContext as we expect an isSidebarOpen value to be in there
   */
  const { isSidebarOpen } = useContext(GatsbyContext)

  return (
    <>
      <Navbar />
      {isSidebarOpen && <Sidebar />}
      {children}
      <Footer />
    </>
  )
}

export default Layout
