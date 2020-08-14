import React from "react"
import { graphql } from "gatsby"
import {
  Layout,
  Hero,
  About,
  Projects,
  Survey,
  Slider,
  GridProjects,
} from "../components"
import SEO from "../components/seo"

// data is passed in as an argument after the graphql query was added
// the data argument is needed to access the data from the graphql query
const HomePage = ({ data }) => {
  const {
    allAirtable: { projects },
  } = data

  return (
    <Layout>
      {/* add in the projects prop into the hero, so that we can use the 
        images of the projects, as hero backgrounds */}
      <Hero projects={projects} />
      <About />
      <GridProjects projects={projects} title="latest projects" />
      <Survey />
      <Slider />
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Projects" } }
      limit: 4
      sort: { fields: data___date, order: DESC }
    ) {
      projects: nodes {
        id
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default HomePage
