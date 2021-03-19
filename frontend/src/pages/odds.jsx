import React from 'react';
import { graphql } from 'gatsby';

import OddsList from '../components/OddsList';

const Odds = ({ data }) => (
  <>
    <h2 style={{ textAlign: 'center ' }}>
      Todays Odds -
      {' '}
      {new Date().toLocaleDateString()}
    </h2>
    <OddsList data={data} />
  </>
);

export const query = graphql`
  query {
    allOdds {
      totalCount
      nodes {
        commence_time
        home_team
        id
        sites {
          odds {
            spreads {
              points
            }
          }
          site_nice
        }
        sport_key
        sport_nice
        teams
      }
    }
  }`;

export default Odds;
