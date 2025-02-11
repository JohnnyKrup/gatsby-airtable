import React from "react"
import { Link } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import SearchButtons from "./SearchButtons"
const Projects = ({ projects: data, title, isPage }) => {
  const [projects, setProjects] = React.useState(data)
  // more logic will follow for the filtering

  const setBackToAll = () => {
    setProjects(data)
  }

  // that's why we use the useState and do not just iterate over the passed in projects array
  return (
    <Wrapper className="section">
      {/* use the passed in title, in case we forgot to pass a title value take the default title after the OR operator */}
      <Title title={title || "projects"} />
      {isPage && (
        <SearchButtons
          projects={data}
          setProjects={setProjects}
          setBackToAll={setBackToAll}
        />
      )}
      <div className="section-center">
        {
          // we are iterating over the projects from the useState
          projects.map(item => {
            const { id } = item
            const { name, type } = item.data
            const fluid = item.data.image.localFiles[0].childImageSharp.fluid
            return (
              <article key={id}>
                <div className="container">
                  <Image fluid={fluid} className="img" />
                  <div className="info">
                    <p>- {type} -</p>
                    <h3>{name}</h3>
                  </div>
                </div>
              </article>
            )
          })
        }
      </div>
      {!isPage && (
        <Link to="/projects" className="btn">
          all projects
        </Link>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    max-width: var(--max-width);
    display: grid;
    gap: 2rem;
    /* safari workaround */
    grid-gap: 2rem;
    .img {
      height: 20rem;
      border-radius: var(--radius);
      transition: var(--transition);
    }
    article {
      box-shadow: var(--light-shadow);
      border-radius: var(--radius);
      transition: var(--transition);
    }
    article:hover {
      box-shadow: var(--dark-shadow);
    }
    .container {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--clr-primary-7);
      &:hover .img {
        opacity: 0.2;
      }
      .info {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        opacity: 0;
        transition: var(--transition);
        color: var(--clr-white);
        text-align: center;
        p {
          margin-bottom: 0.5rem;
          color: var(--clr-white);
          text-transform: uppercase;
        }
      }
      &:hover .info {
        opacity: 1;
      }
    }
    @media (min-width: 768px) {
      .img {
        height: 15rem;
      }
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      .img {
        height: 12.5rem;
      }
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1200px) {
      .img {
        height: 15rem;
      }
    }
  }
  a {
    display: block;
    width: 9rem;
    text-align: center;
    margin: 0 auto;
    margin-top: 3rem;
  }
`
export default Projects
