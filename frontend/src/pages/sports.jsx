import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SportsList from '../components/SportsList';

const SportsPage = ({ data }) => {
  const sports = data.sports.nodes;

  return (
    <>
      <h2>
        List of all the sports
      </h2>
      <SportsList sports={sports} />
    </>
  );
};

export const query = graphql`
  query Sports {
    sports: allSanitySports {
      nodes {
        name
        id
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 600) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default SportsPage;
