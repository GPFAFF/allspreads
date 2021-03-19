import React from 'react';
import styled from 'styled-components';
import { convertTime, returnTarget } from '../helpers';

const StyledRow = styled.div`
  padding: 10px 0;
  justify-content: start;
`;

const CardStyles = styled.div`
  box-shadow: 0 4px 24px -4px rgba(35, 35, 35, 0.2);
  padding: 20px;
  border: 1px solid #333;
  margin: 10px;
`;

const OddsCard = ({ data }) => {
  const {
    commence_time: time,
    sport_nice: league,
    home_team: homeTeam,
    teams,
    sites,
  } = data;

  console.log(sites);

  return (
    <CardStyles>
      <div>{league}</div>
      <StyledRow>{convertTime(time)}</StyledRow>
      <StyledRow>
        {returnTarget(teams, homeTeam)}
        <br />
        @
        <br />
        {homeTeam}
      </StyledRow>
    </CardStyles>
  );
};

export default OddsCard;
