import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import OddsCard from '../components/OddsCard';
import { uuidv4 } from '../helpers';

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
  const { sports, odds } = data;
  const {
    name,
    image,
    slug: {
      current,
    },
    id,
  } = sports;
  const { data: oddsData } = odds.nodes[0];

  const {
    asset: {
      fluid,
    },
  } = image;

  return (
    <OddsStyles>
      {/* <Img fluid={fluid} alt={name} /> */}
      <h2 style={{ textAlign: 'center' }}>
        {name}
        {' '}
        Odds
      </h2>
      <OddsCardStyles>
        {oddsData.map((sportsData) => (
          <Link
            to={`/sports/${current}/odds/current-odds${id}`}
            // GLOBAL STATE?
            state={{ odds: sportsData }}
          >
            <OddsCard key={uuidv4()} data={sportsData} />
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
      image {
          asset {
          fluid(maxWidth: 800) {
          ...GatsbySanityImageFluid
        }}
      }
    }
    odds:
      allOdds {
        totalCount
        nodes {
          data {
          commence_time
          sport_nice
          home_team
          teams
          sites {
            odds {
              h2h
            }
          }
        }
      }
    }
  }`;

export default Odds;
