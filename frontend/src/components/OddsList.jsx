import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import OddsCard from './OddsCard';

const OddsStyles = styled.div`
  display: grid;
  align-content: center;
  gap: 2rem;
`;

const OddsCardStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Odds = ({ data }) => {
  const {
    allOdds: {
      nodes,
    },
  } = data;

  return (
    <OddsStyles>
      <OddsCardStyles>
        {nodes.map((sportsData) => (
          <StyledLink
            to={`/odds/current-odds/${sportsData.id}`}
            // GLOBAL STATE?
            state={{ odds: sportsData }}
          >
            <OddsCard key={sportsData.id} data={sportsData} />
          </StyledLink>
        ))}
      </OddsCardStyles>
    </OddsStyles>
  );
};

export default Odds;
