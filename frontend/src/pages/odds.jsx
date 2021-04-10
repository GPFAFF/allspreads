import React from 'react';
import { graphql } from 'gatsby';

import OddsList from '../components/OddsList';
import Pagination from '../components/Pagination';

const Odds = ({ data, pageContext }) => {
  const {
    allOdds: {
      totalCount,
    },
  } = data;
  const {
    pageSize,
    currentPage,
    skip,
  } = pageContext;

  return (
    <>
      <h2 style={{ textAlign: 'center ' }}>
        Todays Odds -
        {' '}
        {new Date().toLocaleDateString()}
      </h2>
      <Pagination
        pageSize={pageSize}
        totalCount={totalCount}
        currentPage={currentPage || 1}
        skip={skip}
      />
      <OddsList data={data} />
    </>
  );
};

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    allOdds(limit: $pageSize, skip: $skip) {
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
