import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const SportsCard = ({ sport }) => {
  const { name, image, slug } = sport;
  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <>
      <Link
        to={`/sports/${slug.current}`}
      />
      <h2>{name}</h2>
      <Img fluid={fluid} alt={name} />
    </>
  );
};

export default SportsCard;
