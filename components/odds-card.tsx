import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

import {
  calculateProbability,
  calculateVigPercentage,
  createBookmakerURL,
  formatOdds,
  positiveOrNegativeSpread,
} from "../helpers";
import TeamLogo from "./team-logo";
import SpreadsModal from "./modal";

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
  z-index: 1;

  @media (max-width: 600px) {
    gap: 10px;
    grid-template-columns: 200px 1fr;
  }
`;

const BookRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 105px));
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;

  > span {
    margin: 0 12px !important;
  }
`;

const Pill = styled.p<{ border: boolean }>`
  background-color: var(--grey);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  border: ${({ border }) => (border ? "2px solid var(--green)" : "none")};
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const OddsRow = styled.div`
  display: grid;
  align-items: center;
`;

const ModalRow = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  line-height: 1.5;
`;

const ModalRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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

  const [awayTeam, homeTeam] = item.teams;
  const { time } = item;

  const { bookmakers } = item;
  const { markets } = bookmakers[0];
  const { key } = markets[0];

  const initialState = {
    bookName: "",
    time: "",
    data: {
      favorite: "",
      underdog: "",
      impliedWinPercentFavorite: 0,
      impliedWinPercentUnderdog: 0,
      vig: "",
    },
    outcomes: {
      name: "",
      price: 0,
      point: 0,
    },
  };
  const [isHomeOpen, setHomeIsOpen] = useState(false);
  const [isAwayOpen, setAwayIsOpen] = useState(false);
  const [homeModalInfo, setHomeModalInfo] = useState(initialState);
  const [awayModalInfo, setAwayModalInfo] = useState(initialState);

  const homeHandleOpen = ({ bookName, time, outcomes }) => {
    const favorite = calculateProbability(outcomes.home.price);
    const underdog = calculateProbability(outcomes.away.price);
    const data = calculateVigPercentage(favorite, underdog);

    setHomeModalInfo({ bookName, time, outcomes: outcomes.home, data });
    setHomeIsOpen(true);
  };

  const homeHandleClose = () => {
    setHomeIsOpen(false);
    setHomeModalInfo(initialState);
  };

  const awayHandleOpen = ({ bookName, time, outcomes }) => {
    const favorite = calculateProbability(outcomes.away.price);
    const underdog = calculateProbability(outcomes.home.price);
    const data = calculateVigPercentage(favorite, underdog);

    setAwayModalInfo({ bookName, time, outcomes: outcomes.away, data });
    setAwayIsOpen(true);
  };

  const awayHandleClose = () => {
    setAwayIsOpen(false);
    setHomeModalInfo(initialState);
  };

  return (
    <div>
      <OddsTitle>
        <ScoreCardRow>
          <TeamLogo
            alt={awayTeam}
            height={50}
            width={50}
            objectFit="contain"
            team={awayTeam}
            slug={router.query.sport}
          />
          {awayTeam}
        </ScoreCardRow>
        <ScoreCardRow>@</ScoreCardRow>
        <ScoreCardRow>
          <TeamLogo
            alt={homeTeam}
            height={50}
            width={50}
            objectFit="contain"
            team={homeTeam}
            slug={router.query.sport}
          />{" "}
          {homeTeam}
        </ScoreCardRow>
      </OddsTitle>
      <p>
        {new Date(time).toLocaleDateString()} - Time:{" "}
        {new Date(time).toLocaleTimeString()}
      </p>
      <OddsWrapper>
        <OddsRow>
          <OddsContainer>
            <h3 className="sticky">{active}</h3>
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
          <div>
            {item.lines.map((line, i) => {
              const homeTeamPrice =
                line.books[0].markets[0].outcomes[0].name === homeTeam
                  ? line.books[0].markets[0].outcomes[0].point
                  : line.books[0].markets[0].outcomes[1].point;

              const awayTeamPrice =
                line.books[0].markets[0].outcomes[0].name === awayTeam
                  ? line.books[0].markets[0].outcomes[0].point
                  : line.books[0].markets[0].outcomes[1].point;

              return (
                <OddsContainer key={i}>
                  <>
                    <div className="sticky">
                      {awayTeam}{" "}
                      {awayTeamPrice && key !== "totals"
                        ? positiveOrNegativeSpread(awayTeamPrice)
                        : key === "totals"
                        ? awayTeamPrice
                        : ""}
                    </div>
                    <BookRow
                      style={{ width: awaySpreadWidth }}
                      ref={awaySpreadRef}
                    >
                      {bookmakers.map((bookmaker, i) => {
                        const { outcomes } = bookmaker.markets[0];

                        const isAwayTeamOutcomes =
                          outcomes[0].name === awayTeam
                            ? {
                                home: outcomes[1],
                                away: outcomes[0],
                              }
                            : {
                                home: outcomes[0],
                                away: outcomes[1],
                              };

                        const containsBook = line.books.includes(bookmaker);

                        return (
                          <div
                            onClick={() =>
                              containsBook
                                ? awayHandleOpen({
                                    bookName: bookmaker.title,
                                    time: bookmaker.last_update,
                                    outcomes: isAwayTeamOutcomes,
                                  })
                                : ""
                            }
                            style={{
                              textAlign: "center",
                            }}
                            key={i}
                          >
                            {containsBook ? (
                              <Pill border>
                                {formatOdds(isAwayTeamOutcomes.away.price)}
                              </Pill>
                            ) : (
                              <Pill border={false}>&nbsp;</Pill>
                            )}
                          </div>
                        );
                      })}
                    </BookRow>
                  </>
                  <>
                    <div className="sticky">
                      {homeTeam}{" "}
                      {homeTeamPrice && key !== "totals"
                        ? positiveOrNegativeSpread(homeTeamPrice)
                        : key === "totals"
                        ? homeTeamPrice
                        : ""}
                    </div>
                    <BookRow
                      style={{ width: homeSpreadWidth }}
                      ref={homeSpreadRef}
                    >
                      {bookmakers.map((bookmaker, i) => {
                        const { outcomes } = bookmaker.markets[0];

                        const homeTeamOutcomes =
                          outcomes[0].name === homeTeam
                            ? { home: outcomes[0], away: outcomes[1] }
                            : { home: outcomes[1], away: outcomes[0] };

                        const containsBook = line.books.includes(bookmaker);

                        return (
                          <div
                            onClick={() =>
                              containsBook
                                ? homeHandleOpen({
                                    bookName: bookmaker.title,
                                    time: bookmaker.last_update,
                                    outcomes: homeTeamOutcomes,
                                  })
                                : ""
                            }
                            style={{
                              textAlign: "center",
                            }}
                            key={i}
                          >
                            {containsBook ? (
                              <Pill border>
                                {formatOdds(homeTeamOutcomes.home.price)}
                              </Pill>
                            ) : (
                              <Pill border={false}>&nbsp;</Pill>
                            )}
                          </div>
                        );
                      })}
                    </BookRow>
                  </>
                </OddsContainer>
              );
            })}
          </div>
        </OddsRow>
      </OddsWrapper>
      <SpreadsModal handleClose={homeHandleClose} isOpen={isHomeOpen}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <TeamLogo
            alt="logo"
            height={50}
            width={50}
            objectFit="contain"
            team={""}
            slug={""}
          />
          <FaWindowClose onClick={homeHandleClose} size={25} />
        </div>
        <ModalRowContainer>
          <ModalRow>
            <div>Date</div>
            <div>Bet</div>
            <div>Market</div>
            <div>Odds</div>
            {homeModalInfo.outcomes.point && <div>Spread</div>}
            <div>No-Vig Odds</div>
            <div>Implied Win %</div>
            <div>Bookmaker Vig</div>
          </ModalRow>
          <ModalRow>
            <div>
              {new Date(homeModalInfo.time).toLocaleDateString()} -
              {new Date(homeModalInfo.time).toLocaleTimeString()}
            </div>
            <div>{homeModalInfo.outcomes.name}</div>
            <div>{homeModalInfo.bookName}</div>
            <div>{formatOdds(homeModalInfo.outcomes.price)}</div>
            {homeModalInfo.outcomes.point && (
              <div>
                {positiveOrNegativeSpread(homeModalInfo.outcomes.point)}
              </div>
            )}
            <div>{positiveOrNegativeSpread(homeModalInfo?.data?.favorite)}</div>
            <div>
              {(homeModalInfo?.data?.impliedWinPercentFavorite * 100).toFixed(
                2
              )}
              %
            </div>
            <div>{homeModalInfo?.data?.vig}</div>
          </ModalRow>
        </ModalRowContainer>
      </SpreadsModal>
      <SpreadsModal handleClose={awayHandleClose} isOpen={isAwayOpen}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <TeamLogo
            alt="logo"
            height={50}
            width={50}
            objectFit="contain"
            team={""}
            slug={""}
          />
          <FaWindowClose onClick={awayHandleClose} size={25} />
        </div>
        <ModalRowContainer>
          <ModalRow>
            <div>Date</div>
            <div>Bet</div>
            <div>Book</div>
            <div>Odds</div>
            {awayModalInfo.outcomes.point && <div>Spread</div>}
            <div>No-Vig Odds</div>
            <div>Implied Win %</div>
            <div>Bookmaker Vig</div>
          </ModalRow>
          <ModalRow>
            <div>
              {new Date(awayModalInfo.time).toLocaleDateString()} -{" "}
              {new Date(awayModalInfo.time).toLocaleTimeString()}
            </div>
            <div>{awayModalInfo.outcomes.name}</div>
            <div>{awayModalInfo.bookName}</div>
            {awayModalInfo.outcomes.point && (
              <div>
                {positiveOrNegativeSpread(awayModalInfo.outcomes.point)}
              </div>
            )}
            <div>{formatOdds(awayModalInfo.outcomes.price)}</div>
            <div>{positiveOrNegativeSpread(awayModalInfo?.data?.underdog)}</div>
            <div>
              {(awayModalInfo?.data?.impliedWinPercentUnderdog * 100).toFixed(
                2
              )}
              %
            </div>
            <div>{awayModalInfo?.data?.vig}</div>
          </ModalRow>
        </ModalRowContainer>
      </SpreadsModal>
    </div>
  );
}
