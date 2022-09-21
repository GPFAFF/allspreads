import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  createBookmakerURL,
  formatOdds,
  positiveOrNegativeSpread,
} from "../helpers";
import TeamLogo from "./team-logo";
import Spreads from "./spreads";
import Totals from "./totals";
import H2H from "./H2H";

const OddsTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    display: grid;
    justify-content: start;
  }
`;

const OddsContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: center;
  padding-bottom: 8px;
`;

const BookRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 105px));
  gap: 10px;
  align-items: center;

  > span {
    margin: 0 12px !important;
  }
`;

const Pill = styled.p`
  background-color: var(--grey);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  border: 2px solid var(--green);
  margin: 0 0 4px 0;
  font-size: 18px;
`;

const ScoreCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

const OddsWrapper = styled.div`
  overflow-x: scroll;
  margin-bottom: 20px;
  border: 4px solid var(--green);
  border-radius: 8px;
  padding: 14px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const OddsRow = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 70px);
  align-items: center;
`;

export default function OddsCard({ item, active }) {
  const router = useRouter();

  const bookRef = useRef(null);
  const homeSpreadRef = useRef(null);
  const awaySpreadRef = useRef(null);

  const [bookWidth, setBookWidth] = useState(1400);
  const [homeSpreadWidth, setHomeSpreadWidth] = useState(1400);
  const [awaySpreadWidth, setAwaySpreadWidth] = useState(1400);

  useEffect(() => {
    setBookWidth(bookRef.current.childNodes.length * 115);
    setHomeSpreadWidth(homeSpreadRef.current.childNodes.length * 115);
    setAwaySpreadWidth(awaySpreadRef.current.childNodes.length * 115);
  }, [bookWidth, homeSpreadWidth, awaySpreadWidth]);

  const { bookmakers } = item;

  return (
    <div>
      <OddsTitle>
        <ScoreCardRow>
          <TeamLogo
            alt={item.away_team}
            height={50}
            width={50}
            objectFit="contain"
            team={item.away_team}
            slug={router.query.sport}
          />
          {item.away_team}
        </ScoreCardRow>
        <ScoreCardRow>@</ScoreCardRow>
        <ScoreCardRow>
          <TeamLogo
            alt={item.home_team}
            height={50}
            width={50}
            objectFit="contain"
            team={item.home_team}
            slug={router.query.sport}
          />{" "}
          {item.home_team}
        </ScoreCardRow>
      </OddsTitle>
      <p>
        {new Date(item.commence_time).toLocaleDateString()} - Time:{" "}
        {new Date(item.commence_time).toLocaleTimeString()}
      </p>
      <OddsWrapper>
        <OddsRow>
          <OddsContainer>
            <h3>{active}</h3>
            <BookRow style={{ width: bookWidth }} ref={bookRef}>
              {bookmakers.map((bookmaker, i) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    key={i}
                  >
                    <a
                      className="book-anchor"
                      target="_blank"
                      style={{ padding: "8px" }}
                      href={`${createBookmakerURL(
                        bookmaker.title.toLowerCase()
                      )}`}
                      rel="noreferrer"
                    >
                      <span className="visuallyhidden">{bookmaker.title}</span>
                      <TeamLogo
                        style={{ padding: "0 12px" }}
                        alt={bookmaker.title}
                        height={50}
                        width={50}
                        objectFit="contain"
                        team={bookmaker.key}
                        slug="books"
                      />
                    </a>
                  </div>
                );
              })}
            </BookRow>
          </OddsContainer>
          <OddsContainer>
            <p>{item.away_team}</p>
            <BookRow style={{ width: awaySpreadWidth }} ref={awaySpreadRef}>
              {bookmakers.map((bookmaker, i) => {
                const { outcomes } = bookmaker.markets[0];

                const { price, point } = outcomes[0];

                return (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                    key={i}
                  >
                    <Pill>
                      {point ? (
                        <>
                          {active !== "totals"
                            ? positiveOrNegativeSpread(point)
                            : point}
                          &nbsp;
                          {formatOdds(price)}
                        </>
                      ) : (
                        <>{formatOdds(price)}</>
                      )}
                    </Pill>
                  </div>
                );
              })}
            </BookRow>
          </OddsContainer>
          <OddsContainer>
            <p>{item.home_team}</p>
            <BookRow style={{ width: homeSpreadWidth }} ref={homeSpreadRef}>
              {bookmakers.map((bookmaker, i) => {
                const { outcomes } = bookmaker.markets[0];

                const { price, point } = outcomes[1];

                return (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                    key={i}
                  >
                    <Pill>
                      {point ? (
                        <>
                          {active !== "totals"
                            ? positiveOrNegativeSpread(point)
                            : point}
                          &nbsp;
                          {formatOdds(price)}
                        </>
                      ) : (
                        <>{formatOdds(price)}</>
                      )}
                    </Pill>
                  </div>
                );
              })}
            </BookRow>
          </OddsContainer>
        </OddsRow>
      </OddsWrapper>
    </div>
  );
}
