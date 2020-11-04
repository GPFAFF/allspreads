import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const OddsStyles = styled.div`
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

const Odds = ({ data: { data } }) => {
  const { name, image } = data;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <OddsStyles>
      <Img fluid={fluid} alt={name} />
      <div>
        <h2>
          {name}
          {' '}
          Odds
        </h2>
      </div>
    </OddsStyles>
  );
};

export const query = graphql`
  query($slug: String!) {
    data: sanitySports(slug: { current: { eq: $slug }}) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }`;

export default Odds;
