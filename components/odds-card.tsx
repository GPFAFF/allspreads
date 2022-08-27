import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { format } from "date-fns";
import styled from "styled-components";
import { getFilePrefix, positiveOrNegativeSpread } from "../helpers";
import TeamLogo from "./team-logo";

const OddsTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
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

  &:hover {
    transition: 0.5s;
    transform: scale(1.01);
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

export default function OddsCard({ item }) {
  const router = useRouter();

  return (
    <>
      <OddsTitle>
        <TeamLogo
          style={{ paddingRight: "8px" }}
          alt={item.away_team}
          height={50}
          width={50}
          objectFit="contain"
          team={item.away_team}
          slug={router.query.sport}
        />
        {item.away_team} @{" "}
        <TeamLogo
          alt={item.home_team}
          height={50}
          width={50}
          objectFit="contain"
          team={item.home_team}
          slug={router.query.sport}
        />{" "}
        {item.home_team}
      </OddsTitle>
      <p>{new Date(item.commence_time).toLocaleDateString()}</p>
      <p>Time: {new Date(item.commence_time).toLocaleTimeString()}</p>
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
