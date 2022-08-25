import React from "react";
import styled from "styled-components";

const ScoreCardStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  list-style-type: none;
  background-color: var(--green);
  border-radius: 8px;
  text-align: center;
  padding: 14px 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: scale(1);
  transition: 0.5s;

  > h3 {
    margin-bottom: 20px;
  }

  &:hover {
    transition: 0.5s;
    transform: scale(1.01);
  }
`;

export default function ScoresCard({ item }) {
  return (
    <ScoreCardStyles>
      <h3>
        {item.away_team} @ {item.home_team}
      </h3>
      <p>{new Date(item.commence_time).toLocaleDateString()}</p>
      {item.completed ? <p>Score: {item.scores}</p> : <p>Score: 0 - 0</p>}
    </ScoreCardStyles>
  );
}
