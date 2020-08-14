import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Title from "./Title"
import styled from "styled-components"
import Image from "gatsby-image"
import { FaQuoteRight } from "react-icons/fa"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"

const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Customers" } }) {
      customers: nodes {
        id
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

const Slider = () => {
  const {
    allAirtable: { customers },
  } = useStaticQuery(query)
  // [index] is the index of which slide should be shown
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const lastIndex = customers.length - 1
    // if the index would become -1, set it back to the last index of the array
    if (index < 0) {
      setIndex(lastIndex)
    }
    // if the index would become bigger than the biggest index in the array
    // set it back to 0
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, customers])

  return (
    <Wrapper className="section">
      <Title title="reviews" />
      <div className="section-center">
        {
          // customerIndex represents the index of the customer array from the graphQL query
          // very important to understand, that these 2 indexes are not the same
          // index is the number at which position the display index stands
          customers.map((customer, customerIndex) => {
            //console.log(`CI: ${customerIndex}`)
            //console.log(`I: ${index}`)
            const {
              data: { name, quote, title, image },
            } = customer
            const customerImg = image.localFiles[0].childImageSharp.fixed

            // by default all have the class nextSlide (flying in from the right)
            // only the where the customerIndex matches the useState index
            // that is controlled by the left and right buttons, will receive the activeSlide class
            let position = "nextSlide"
            if (customerIndex === index) {
              position = "activeSlide"
            }
            // logic to send the previous index to the left
            // so that not all slides are on the right
            if (
              customerIndex === index - 1 ||
              (index === 0 && customerIndex === customers.length - 1)
            ) {
              position = "lastSlide"
            }

            return (
              <article key={customerIndex} className={position}>
                <Image fixed={customerImg} className="img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            )
          })
        }
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </Wrapper>
  )
}

// because the <article> is position absolute
// the parent of the <article> needs to have a width and a height
// all <article> are by default set to opacity = 0 (invisible)
// only the <article> with the classname="activeSlide" will have its opacity set to 100 (visible)
const Wrapper = styled.div`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    width: 80vw;
    height: 450px;
    max-width: 800px;
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
    .img {
      border-radius: 50%;
      margin-bottom: 1rem;
    }
    h4 {
      text-transform: uppercase;
      color: var(--clr-primary-5);
      margin-bottom: 0.25rem;
    }
    .title {
      text-transform: capitalize;
      margin-bottom: 0.75rem;
    }
    .text {
      max-width: 45em;
      margin: 0 auto;
      line-height: 2;
      color: var(--clr-grey-5);
    }
    .icon {
      font-size: 3rem;
      margin-top: 1rem;
      color: var(--clr-primary-5);
    }
    .prev,
    .next {
      position: absolute;
      top: 200px;
      transform: translateY(-50%);
      background: var(--clr-grey-5);
      color: var(--clr-white);
      width: 1.25rem;
      height: 1.25rem;
      display: grid;
      place-items: center;
      border-color: transparent;
      font-size: 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: var(--transition);
    }
    .prev:hover,
    .next:hover {
      background: var(--clr-primary-5);
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    @media (min-width: 800px) {
      .prev,
      .next {
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
      }
    }
    article {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);
    }
    article.activeSlide {
      opacity: 1;
      transform: translateX(0);
    }
    article.lastSlide {
      transform: translateX(-100%);
    }
    article.nextSlide {
      transform: translateX(100%);
    }
  }
`
export default Slider
