import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SportsStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
`;

const SportsCardStyles = styled.div`
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

const SportsList = ({ sports }) => (
  <SportsStyles>
    {sports.map((sport) => (
      <SportsCard
        key={sport.id}
        sport={sport}
      />
    ))}
  </SportsStyles>
);

const SportsCard = ({ sport }) => {
  const { name, image, slug } = sport;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <SportsCardStyles>
      <Link
        to={`/sports/${slug.current}`}
      >
        <h2>{name}</h2>
      </Link>
      <Img fluid={fluid} alt={name} />
    </SportsCardStyles>
  );
};

export default SportsList;
