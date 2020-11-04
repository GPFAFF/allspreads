import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const FantasyStyles = styled.div`
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

const Fantasy = ({ data: { data } }) => {
  const { name, image } = data;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <FantasyStyles>
      <Img fluid={fluid} alt={name} />
      <div>
        <h2>
          {name}
          {' '}
          Fantasy
        </h2>
      </div>
    </FantasyStyles>
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

export default Fantasy;
