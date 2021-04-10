import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import OddsCard from '../components/OddsCard';
import { uuidv4, returnKey } from '../helpers';

const OddsStyles = styled.div`
  display: grid;
  align-content: center;
  gap: 2rem;
`;

const OddsCardStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Odds = ({ data }) => {
  const {
    sports,
    allOdds: {
      nodes,
    },
  } = data;
  const {
    name,
    slug: {
      current,
    },
  } = sports;

  console.log('o', data.allOdds.totalCount);
  // const key = returnKey(name);
  // const [sportsData, setSportsData] = useState([]);

  // useEffect(() => {
  //   fetch(`https://api.the-odds-api.com/v3/odds/?sport=${key}&region=us&mkt=spreads&apiKey=fa695612eb739783c35e3792c855f50a`)
  //     .then((response) => response.json())
  //     .then((results) => setSportsData(results.data));
  // }, []);

  return (
    <OddsStyles>
      {/* <Img fluid={fluid} alt={name} /> */}
      <h2 style={{ textAlign: 'center' }}>
        {name}
        {' '}
        Odds
      </h2>
      <OddsCardStyles>
        {nodes.map((node) => (
          <Link
            key={uuidv4()}
            to={`/sports/${current}/odds/current-odds-${node.id}`}
            // GLOBAL STATE?
            state={{ odds: node }}
          >
            <OddsCard data={node} />
          </Link>
        ))}
      </OddsCardStyles>
    </OddsStyles>
  );
};

export const query = graphql`
  query($slug: String!) {
    sports: sanitySports(slug: {current: {eq: $slug }}) {
      name
      slug {
        current
      }
      id
    }
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
