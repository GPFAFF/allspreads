import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const CardStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span;
  gap: 1em;
  h2 {
    margin: 0;
  }
`;

const Card = ({ item }) => {
  const { name, image, slug } = item;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <CardStyles>
      <Link
        to={`/sports/${slug.current}`}
      >
        <h2>{name}</h2>
        <Img fluid={fluid} alt={name} />
      </Link>
    </CardStyles>
  );
};

export default Card;
