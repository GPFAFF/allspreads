import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

import { createBookmakerURL, positiveOrNegativeSpread } from "../helpers";
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

const ScoreCardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
`;

export default function OddsCard({ item }) {
  const router = useRouter();

  return (
    <div>
      <OddsTitle>
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
      <OddsContainer key={item.id}>
        <div>
          {item.away_team}
          <BookmakersStyles>
            {item.bookmakers.map(
              (bookmaker: { title: any; key?: any; markets?: any }) => {
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
                          {bookmaker.markets.map(
                            (market: {
                              key: any;
                              outcomes?: [
                                { point: string; price: string | number }
                              ];
                            }) => {
                              if (market.key === "h2h") {
                                return (
                                  <H2H
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                        <li>
                          {bookmaker.markets.map(
                            (market: {
                              key: any;
                              outcomes?: [
                                { point: string; price: string | number }
                              ];
                            }) => {
                              if (market.key === "spreads") {
                                return (
                                  <Spreads
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                        <li>
                          {bookmaker.markets.map(
                            (market: {
                              key: any;
                              outcomes?: [
                                { point: string; price: string | number }
                              ];
                            }) => {
                              if (market.key === "totals") {
                                return (
                                  <Totals
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                      </OddsGrid>
                    </>
                  </OddsCardStyles>
                );
              }
            )}
          </BookmakersStyles>
        </div>
        <div>
          {item.home_team}
          <BookmakersStyles>
            {item.bookmakers.map(
              (bookmaker: { title: any; key?: any; markets?: any }) => {
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
                          {bookmaker.markets.map(
                            (market: {
                              key: string;
                              outcomes?: [{ price: string | number }];
                            }) => {
                              if (market.key === "h2h") {
                                return (
                                  <H2H
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                        <li>
                          {bookmaker.markets.map(
                            (market: {
                              key: any;
                              outcomes?: [
                                { point: string; price: string | number }
                              ];
                            }) => {
                              if (market.key === "spreads") {
                                return (
                                  <Spreads
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                        <li>
                          {bookmaker.markets.map(
                            (market: {
                              key: string;
                              outcomes?: [
                                { point: string; price: string | number }
                              ];
                            }) => {
                              if (market.key === "totals") {
                                return (
                                  <Totals
                                    key={market.key}
                                    bookmaker={bookmaker}
                                    market={market}
                                  />
                                );
                              }
                            }
                          )}
                        </li>
                      </OddsGrid>
                    </>
                  </OddsCardStyles>
                );
              }
            )}
          </BookmakersStyles>
        </div>
      </OddsContainer>
    </div>
  );
}
