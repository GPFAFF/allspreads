import React from 'react';
import { graphql } from 'gatsby';
import List from '../components/List';

const Picks = ({ data }) => {
  const picks = data.picks.nodes;

  return (
    <>
      <h2>List of all the Picks</h2>
      <List data={picks} />
    </>
  );
};

export const query = graphql`
  query Picks {
    picks: allSanityPerson {
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

export default Picks;
