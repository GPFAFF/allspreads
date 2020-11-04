import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SportStyles = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  div {
    &:last-of-type {
      display: grid;
      justify-content: center;
    }
  }
`;

const Sports = ({ data: { data } }) => {
  const { name, image, slug } = data;
  const { current } = slug;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <SportStyles>
      <Img fluid={fluid} alt={name} />
      <div>
        <h2>{name}</h2>
        <Link
          to={`/sports/${current}/fantasy`}
        >
          <h2>Fantasy</h2>
        </Link>
        <Link
          to={`/sports/${current}/odds`}
        >
          <h2>Odds</h2>
        </Link>
      </div>
    </SportStyles>
  );
};

export const query = graphql`
  query($slug: String!) {
    data: sanitySports(slug: { current: { eq: $slug }}) {
      name
      id
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }`;

export default Sports;
