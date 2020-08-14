import React from "react"
import styled from "styled-components"

const SearchButtons = ({ projects, setProjects, setBackToAll }) => {
  const [index, setIndex] = React.useState(0)

  /**
   * Get all the types out of the projects
   * this will result in duplicate values if a type is used more than once
   * --
   * const types = projects.map(project => {
   * return project.data.type
   * })
   * console.log(types)
   */

  /**
   * ...new Set()
   * this is similar to the distinct function
   * then pass in the function that returns all the types into ...new Set()
   * the ... will spread out all values back to the array
   */
  const types = [
    "all",
    ...new Set(
      projects.map(project => {
        return project.data.type
      })
    ),
  ]

  //console.log(types)

  const showProjects = (type, typeIndex) => {
    setIndex(typeIndex)
    if (type === "all") {
      setBackToAll()
    } else {
      const tempProjects = projects.filter(
        project => project.data.type === type
      )
      setProjects(tempProjects)
    }
  }

  return (
    <Wrapper>
      {types.map((type, typeIndex) => {
        return (
          <button
            key={typeIndex}
            className={index === typeIndex ? "active" : undefined}
            onClick={() => showProjects(type, typeIndex)}
          >
            {type}
          </button>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: flex;
  margin-bottom: 0;
  justify-content: center;
  flex-wrap: wrap;
  button {
    margin: 0.5rem;
    text-transform: capitalize;
    background: transparent;
    border: transparent;
    color: var(--clr-grey-6);
    letter-spacing: var(--spacing);
    font-size: 1rem;
    padding: 0.25rem;
    cursor: pointer;
    outline: none;
    transition: var(--transition);
  }
  button:hover,
  button.active {
    box-shadow: 0px 1.5px 0 var(--clr-grey-6);
  }
`
export default SearchButtons
