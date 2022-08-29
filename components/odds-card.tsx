import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { format } from "date-fns";
import styled from "styled-components";
import {
  createBookmakerURL,
  getFilePrefix,
  positiveOrNegativeSpread,
} from "../helpers";
import TeamLogo from "./team-logo";
import Link from "next/link";

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
  grid-template-rows: repeat(auto-fit, minmax(60px, 1fr));
  width: 100%;
`;

const OddsCardStyles = styled.ul`
  display: grid;
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
  }

  > li {
    font-family: monospace;
  }

  > a {
    margin: 16px 0;
  }

  &:hover {
    transition: 0.5s;
    transform: scale(1.01);
    cursor: pointer;
  }
`;

const BookmakersStyles = styled.p`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  overflow-x: scroll;
`;

const OddsGrid = styled.div`
  display: grid;
  gap: 12px;

  > li {
    font-family: monospace;
  }
`;

const ScoreCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

export default function OddsCard({ item }) {
  const router = useRouter();

  return (
    <>
      <OddsTitle key={item.id}>
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
          {item.away_team}
        </ScoreCardRow>
        <ScoreCardRow>@ </ScoreCardRow>
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
      <p>{new Date(item.commence_time).toLocaleDateString()}</p>
      <p>Time: {new Date(item.commence_time).toLocaleTimeString()}</p>
      <OddsContainer>
        <div>
          {item.away_team}
          <BookmakersStyles>
            {item.bookmakers.map((bookmaker) => {
              return (
                <OddsCardStyles key={bookmaker.title}>
                  <>
                    <TeamLogo
                      alt={bookmaker.title}
                      height={25}
                      width={25}
                      objectFit="contain"
                      team={bookmaker.key}
                      slug="books"
                    />
                    <Link
                      target="_blank"
                      style={{ margin: "8px", paddingTop: "8px" }}
                      href={`${createBookmakerURL(
                        bookmaker.title.toLowerCase()
                      )}`}
                    >
                      {bookmaker.title}
                    </Link>
                    <OddsGrid>
                      <li>
                        H2H{" "}
                        {bookmaker.markets.map((market) => {
                          if (market.key === "h2h")
                            return (
                              <>
                                <span key={bookmaker.title}>
                                  {""}
                                  {Number(market.outcomes[0].price) > 0
                                    ? `+${market.outcomes[0].price}`
                                    : `${market.outcomes[0].price}`}
                                </span>
                              </>
                            );
                        })}
                      </li>
                      <li>
                        {bookmaker.markets.map((market) => {
                          if (market.key === "spreads") {
                            return (
                              <>
                                <li key={`${bookmaker.title} - ${market.key}`}>
                                  Spreads
                                </li>
                                <li>
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].point
                                  )}{" "}
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].price
                                  )}
                                </li>
                              </>
                            );
                          }
                        })}
                      </li>
                      <li>
                        {bookmaker.markets.map((market) => {
                          if (market.key === "totals")
                            return (
                              <>
                                <li key={`${bookmaker.title} - ${market.key}`}>
                                  Totals
                                </li>
                                <li>
                                  O/U {market.outcomes[0].point}{" "}
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].price
                                  )}
                                </li>
                              </>
                            );
                        })}
                      </li>
                    </OddsGrid>
                  </>
                </OddsCardStyles>
              );
            })}
          </BookmakersStyles>
        </div>
        <div>
          {item.home_team}
          <BookmakersStyles>
            {item.bookmakers.map((bookmaker) => {
              return (
                <OddsCardStyles key={bookmaker.title}>
                  <>
                    <TeamLogo
                      alt={bookmaker.title}
                      height={25}
                      width={25}
                      objectFit="contain"
                      team={bookmaker.key}
                      slug="books"
                    />
                    <Link
                      target="_blank"
                      style={{ margin: "8px", paddingTop: "8px" }}
                      href={`${createBookmakerURL(
                        bookmaker.title.toLowerCase()
                      )}`}
                    >
                      {bookmaker.title}
                    </Link>
                    <OddsGrid>
                      <li>
                        H2H{" "}
                        {bookmaker.markets.map((market) => {
                          if (market.key === "h2h")
                            return (
                              <>
                                <span
                                  key={`${bookmaker.title} - ${market.key}`}
                                >
                                  {""}
                                  {Number(market.outcomes[0].price) > 0
                                    ? `+${market.outcomes[0].price}`
                                    : `${market.outcomes[0].price}`}
                                </span>
                              </>
                            );
                        })}
                      </li>
                      <li>
                        {bookmaker.markets.map((market) => {
                          if (market.key === "spreads") {
                            return (
                              <>
                                <li key={`${bookmaker.title} - ${market.key}`}>
                                  Spreads
                                </li>
                                <li>
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].point
                                  )}{" "}
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].price
                                  )}
                                </li>
                              </>
                            );
                          }
                        })}
                      </li>
                      <li>
                        {bookmaker.markets.map((market) => {
                          if (market.key === "totals")
                            return (
                              <>
                                <li key={`${bookmaker.title} - ${market.key}`}>
                                  Totals
                                </li>
                                <li>
                                  O/U {market.outcomes[0].point}{" "}
                                  {positiveOrNegativeSpread(
                                    market.outcomes[0].price
                                  )}
                                </li>
                              </>
                            );
                        })}
                      </li>
                    </OddsGrid>
                  </>
                </OddsCardStyles>
              );
            })}
          </BookmakersStyles>
        </div>
      </OddsContainer>
    </>
  );
}
