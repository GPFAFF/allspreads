import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { toBase64, shimmer, positiveOrNegativeSpread } from "../helpers";

const Odds = styled.div`
  margin-bottom: 20px;
`;

const OddsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, minmax(60px, 1fr));
  width: 100%;
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  gap: 2em; */
  /* display: grid;
  background-color: #eee;
  width: 100%;
  padding: 20px;
  margin: 20px;

  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span;
  gap: 1em;
  h2 {
    margin: 0;
  } */
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

  &:hover {
    transition: 0.5s;
    transform: scale(1.01);
  }
`;

const BookmakersStyles = styled.div`
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

export default function OddsCard({ item }) {
  return (
    <>
      <h2>
        {item.away_team} @ {item.home_team}
      </h2>
      <p>{new Date(item.commence_time).toLocaleDateString()}</p>
      <OddsContainer>
        <p>
          {item.away_team}
          <BookmakersStyles>
            {item.bookmakers.map((bookmaker) => {
              return (
                <OddsCardStyles key={bookmaker.title}>
                  <>
                    <h3>{bookmaker.title}</h3>
                    <OddsGrid>
                      <li>
                        H2H{" "}
                        {bookmaker.markets.map((market) => {
                          if (market.key === "h2h")
                            return (
                              <>
                                <span>
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
                                <li>Spreads</li>
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
                                <li>Totals</li>
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
        </p>
        <p>
          {item.home_team}
          <BookmakersStyles>
            {item.bookmakers.map((bookmaker) => {
              return (
                <OddsCardStyles key={bookmaker.title}>
                  <>
                    <h3>{bookmaker.title}</h3>
                    <OddsGrid>
                      <li>
                        H2H{" "}
                        {bookmaker.markets.map((market) => {
                          if (market.key === "h2h")
                            return (
                              <>
                                <span>
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
                                <li>Spreads</li>
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
                                <li>Totals</li>
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
        </p>
      </OddsContainer>
    </>
  );
}
