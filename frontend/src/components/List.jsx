import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import styled from 'styled-components';

const ListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
`;

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

  console.log(" ia m erere", name)

  return (
    <CardStyles>
      <Link
        to={`/sports/${slug.current}`}
      >
        <h2>{name}</h2>
      </Link>
      <Img fluid={fluid} alt={name} />
    </CardStyles>
  );
};

const List = ({ data }) => (
  <ListStyles>
    {data.map((item) => (
      <Card
        key={item.id}
        item={item}
      />
    ))}
  </ListStyles>
);

export default List;
