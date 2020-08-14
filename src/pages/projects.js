import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Layout, Projects, Algolia } from "../components"

/**
 * because it is a page the graphQL query, gets imported as a data parameter
 * of the Page. In components we need to use the useStateQuery(query) function
 */

const ProjectsPage = ({ data }) => {
  const {
    allAirtable: { nodes: projects },
  } = data
  return (
    <Wrapper>
      <Layout>
        <Projects title="our projects" projects={projects} isPage />
        <Algolia />
      </Layout>
    </Wrapper>
  )
}

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Projects" } }) {
      nodes {
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

const Wrapper = styled.main`
  min-height: 100vh;
  background: var(--clr-grey-10);
  nav {
    background: var(--clr-primary-7);
  }
`

export default ProjectsPage
