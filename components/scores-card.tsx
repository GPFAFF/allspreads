import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import TeamLogo from "./team-logo";

const ScoreCardStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 440px));
  gap: 2rem;
  list-style-type: none;
  background-color: var(--grey);
  border: 4px solid var(--green);
  border-radius: 8px;
  text-align: center;
  padding: 14px 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transform: scale(1);
  transition: 0.5s;

  > h3 {
    margin-bottom: 20px;
    text-align: center;

    > div:nth-child(2) {
      margin-left: 14px;
    }
  }

  &:hover {
    transition: 0.5s;
    transform: scale(1.01);
    cursor: pointer;
  }

  > p {
    font-family: monospace;
    > span {
      padding: 4px;
      display: block;
    }
  }
`;

const TeamName = styled.h4`
  margin-left: 8px;
  text-align: left;
`;

const ScoreCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
  gap: 10px;
  margin: 10px 0;
`;

const Scoreboard = styled.div`
  > span {
    display: block;
    margin: 4px;
  }
`;
export default function ScoresCard({ item, scores }) {
  const router = useRouter();

  return (
    <ScoreCardStyles>
      <h3>
        <ScoreCardRow>
          <TeamLogo
            style={{ paddingRight: "8px" }}
            alt={item.away_team}
            height={50}
            width={50}
            objectFit="contain"
            team={item.away_team}
            slug={router.query.sport}
          />
          <TeamName>{item.away_team}</TeamName>
        </ScoreCardRow>
        <ScoreCardRow>@</ScoreCardRow>
        <ScoreCardRow>
          <TeamLogo
            style={{ paddingRight: "8px" }}
            alt={item.home_team}
            height={50}
            width={50}
            objectFit="contain"
            team={item.home_team}
            slug={router.query.sport}
          />
          <TeamName>{item.home_team}</TeamName>
        </ScoreCardRow>
      </h3>
      <p>
        <span>
          Game Day: {new Date(item.commence_time).toLocaleDateString()}
        </span>
        <span>Time: {new Date(item.commence_time).toLocaleTimeString()}</span>
      </p>
      {item.completed && scores ? (
        <Scoreboard>
          {scores.map((item) => (
            <span key={item.name}>
              {item.name}: {item.score}{" "}
            </span>
          ))}
        </Scoreboard>
      ) : (
        <>
          <div>Score 0 - 0</div>
        </>
      )}
    </ScoreCardStyles>
  );
}
