import React from 'react';
import styled from 'styled-components';
import { convertTime, returnTarget } from '../helpers';

const OddsCardStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  gap: 20px;
`;

const SingleOdds = ({ location }) => {
  const {
    state: {
      odds,
    },
  } = location;

  const {
    commence_time: time,
    sport_nice: sportName,
    home_team: homeTeam,
    teams,
  } = odds;

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        {sportName}
      </h2>
      <OddsCardStyles>
        <span>
          {returnTarget(teams, homeTeam)}
        </span>
        <span>VS</span>
        <span>{homeTeam}</span>
        <div>{convertTime(time)}</div>
      </OddsCardStyles>
    </>
  );
};

export default SingleOdds;
