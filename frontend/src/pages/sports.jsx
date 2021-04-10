import React from 'react';
import { graphql } from 'gatsby';
import List from '../components/List';

const SportsPage = ({ data }) => {
  const sports = data.sports.nodes;
  return (
    <>
      <h2>
        Choose your sport below
      </h2>
      <List
        path
        data={sports}
      />
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
