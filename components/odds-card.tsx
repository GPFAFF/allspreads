import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

import {
  calculateEvPercentage,
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
  grid-template-columns: 450px 1fr;
  align-items: start;
  z-index: 1;
  gap: 0 10px;

  @media (max-width: 600px) {
    gap: 0 10px;
    grid-template-columns: 230px 1fr;
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

const Pill = styled.div<{ border: boolean }>`
  background-color: var(--grey);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  border: ${({ border }) => (border ? "2px solid var(--green)" : "none")};
  margin: 0;
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
  padding: 30px 15px;
  background-color: white;
  z-index: 10;
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

const StickyPill = styled(Pill)`
  margin: 0 8px 0 0;
  background-color: var(--grey) !important;
  border: 2px solid var(--green);
  text-align: left;
  padding: 10px;
  border-radius: 0 4px 4px 0;
  display: grid;
  position: sticky;
  grid-template-columns: 1fr 30px 30px 30px;
  gap: 20px;
  left: 20px;

  @media (max-width: 600px) {
    font-size: 14px;
    align-items: center;
    grid-template-columns: 80px 20px 20px 20px;
    padding: 5px;
  }

  &:before {
    content: "";
    display: block;
    width: 28px;
    height: 200px;
    background: var(--white);
    position: absolute;
    left: -30px;
    top: -120px;
  }
`;

const TitleContainer = styled.div`
  align-items: center;
  justify-content: center;
  justify-items: start;
  display: grid;
  grid-template-columns: 1fr 30px 30px;
  gap: 20px;
  left: 20px;
  padding-right: 15px;

  @media (max-width: 600px) {
    padding-left: 5px;
    padding-right: 10px;
    gap: 10px;
  }
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
  const { markets } = bookmakers[0] || [];
  const { key } = markets[0] || "";

  const initialState = {
    bookName: "",
    time: "",
    data: {
      home: "",
      away: "",
      impliedWinPercentHome: 0,
      impliedWinPercentAway: 0,
      vig: "",
      evPercent: "",
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
    const home = calculateProbability(outcomes.home.price);
    const away = calculateProbability(outcomes.away.price);
    const data = calculateVigPercentage(home, away);

    const evPercent = calculateEvPercentage(
      outcomes.home.price,
      data.impliedWinPercentHome
    );

    setHomeModalInfo({
      bookName,
      time,
      outcomes: outcomes.home,
      data: { ...data, evPercent },
    });
    setHomeIsOpen(true);
  };

  const homeHandleClose = () => {
    setHomeIsOpen(false);
    setHomeModalInfo(initialState);
  };

  const awayHandleOpen = ({ bookName, time, outcomes }) => {
    const home = calculateProbability(outcomes.home.price);
    const away = calculateProbability(outcomes.away.price);
    const data = calculateVigPercentage(home, away);

    const evPercent = calculateEvPercentage(
      outcomes.away.price,
      data.impliedWinPercentAway
    );

    setAwayModalInfo({
      bookName,
      time,
      outcomes: outcomes.away,
      data: { ...data, evPercent },
    });
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
            <TitleContainer className="sticky">
              <h3>{active}</h3>
              <span style={{ fontSize: "14px" }}>Avg Odds</span>
              <span style={{ fontSize: "14px" }}>Best Odds</span>
            </TitleContainer>
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
              const homeTeamObj =
                line.books[0].markets[0].outcomes[0].name === homeTeam
                  ? line.books[0].markets[0].outcomes[0]
                  : line.books[0].markets[0].outcomes[1];

              const awayTeamObj =
                line.books[0].markets[0].outcomes[0].name === awayTeam
                  ? line.books[0].markets[0].outcomes[0]
                  : line.books[0].markets[0].outcomes[1];

              const homeTeamBestOdds = line.books.reduce((r, c) => {
                if (key === "totals") {
                  const markets = c.markets[0].outcomes.filter(
                    (item) => item.name === "Over"
                  );

                  r[0] =
                    r[0] === undefined || markets[0].price < r[0]
                      ? markets[0].price
                      : r[0];
                  r[1] =
                    r[1] === undefined || markets[0].price > r[1]
                      ? markets[0].price
                      : r[1];

                  return r;
                }
                if (homeTeamObj.name === homeTeam) {
                  const markets = c.markets[0].outcomes.filter(
                    (item) => item.name === homeTeam
                  );

                  r[0] =
                    r[0] === undefined || markets[0].price < r[0]
                      ? markets[0].price
                      : r[0];
                  r[1] =
                    r[1] === undefined || markets[0].price > r[1]
                      ? markets[0].price
                      : r[1];

                  return r;
                }
              }, []);

              const awayTeamBestOdds = line.books.reduce((r, c) => {
                if (key === "totals") {
                  const markets = c.markets[0].outcomes.filter(
                    (item) => item.name === "Under"
                  );

                  r[0] =
                    r[0] === undefined || markets[0].price < r[0]
                      ? markets[0].price
                      : r[0];
                  r[1] =
                    r[1] === undefined || markets[0].price > r[1]
                      ? markets[0].price
                      : r[1];

                  return r;
                }
                if (awayTeamObj.name === awayTeam) {
                  const markets = c.markets[0].outcomes.filter(
                    (item) => item.name === awayTeam
                  );

                  r[0] =
                    r[0] === undefined || markets[0].price < r[0]
                      ? markets[0].price
                      : r[0];
                  r[1] =
                    r[1] === undefined || markets[0].price > r[1]
                      ? markets[0].price
                      : r[1];

                  return r;
                }
              }, []);

              const awayAverageOdds = line.books.reduce(
                (acc, value) => {
                  if (key === "totals") {
                    const markets = value.markets[0].outcomes.filter(
                      (item) => item.name === "Under"
                    );

                    let [positive, negative, total, positiveOrNegative] = acc;
                    if (markets[0].price > 0) {
                      positive++;
                    }
                    if (markets[0].price < 0) {
                      negative++;
                    }

                    if (markets[0].price) {
                      total = total + Math.abs(markets[0].price);
                    }

                    if (positive > negative) {
                      positiveOrNegative = true;
                    } else {
                      positiveOrNegative = false;
                    }

                    return [positive, negative, total, positiveOrNegative];
                  }

                  if (awayTeamObj.name === awayTeam) {
                    const markets = value.markets[0].outcomes.filter(
                      (item) => item.name === awayTeam
                    );

                    let [positive, negative, total, positiveOrNegative] = acc;
                    if (markets[0].price > 0) {
                      positive++;
                    }
                    if (markets[0].price < 0) {
                      negative++;
                    }

                    if (markets[0].price) {
                      total = total + Math.abs(markets[0].price);
                    }

                    if (positive > negative) {
                      positiveOrNegative = true;
                    } else {
                      positiveOrNegative = false;
                    }

                    return [positive, negative, total, positiveOrNegative];
                  }
                },
                [0, 0, 0, false]
              );

              const homeAverageOdds = line.books.reduce(
                (acc, value) => {
                  if (key === "totals") {
                    const markets = value.markets[0].outcomes.filter(
                      (item) => item.name === "Over"
                    );

                    let [positive, negative, total, positiveOrNegative] = acc;
                    if (markets[0].price > 0) {
                      positive++;
                    }
                    if (markets[0].price < 0) {
                      negative++;
                    }

                    if (markets[0].price) {
                      total = total + Math.abs(markets[0].price);
                    }

                    if (positive > negative) {
                      positiveOrNegative = true;
                    } else {
                      positiveOrNegative = false;
                    }

                    return [positive, negative, total, positiveOrNegative];
                  }
                  if (homeTeamObj.name === homeTeam) {
                    const markets = value.markets[0].outcomes.filter(
                      (item) => item.name === homeTeam
                    );

                    let [positive, negative, total, positiveOrNegative] = acc;
                    if (markets[0].price > 0) {
                      positive++;
                    }
                    if (markets[0].price < 0) {
                      negative++;
                    }

                    if (markets[0].price) {
                      total = total + Math.abs(markets[0].price);
                    }

                    if (positive > negative) {
                      positiveOrNegative = true;
                    } else {
                      positiveOrNegative = false;
                    }

                    return [positive, negative, total, positiveOrNegative];
                  }
                },
                [0, 0, 0, false]
              );

              const [_positive, _negative, homeTotal, homePos] =
                homeAverageOdds;
              const [_p, _n, awayTotal, awayPos] = awayAverageOdds;

              return (
                <OddsContainer key={i}>
                  <>
                    <StickyPill border>
                      <span>{awayTeam}</span>
                      <span>
                        {awayTeamObj.point && key !== "totals"
                          ? positiveOrNegativeSpread(
                              awayTeamObj.point.toFixed(1)
                            )
                          : key === "totals"
                          ? awayTeamObj.point.toFixed(1)
                          : ""}
                      </span>
                      <span>
                        {" "}
                        {awayPos
                          ? `+${Math.round(awayTotal / line.books.length)}`
                          : `-${Math.round(awayTotal / line.books.length)}`}
                      </span>
                      <span>
                        {" "}
                        {awayTeamBestOdds
                          ? positiveOrNegativeSpread(awayTeamBestOdds[1])
                          : ""}
                      </span>
                    </StickyPill>
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

                        const containsBook = line.books.some(
                          (item) => item.key === bookmaker.key
                        );

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
                    <StickyPill border>
                      <span>{homeTeam}</span>
                      <span>
                        {homeTeamObj.point && key !== "totals"
                          ? positiveOrNegativeSpread(
                              homeTeamObj.point.toFixed(1)
                            )
                          : key === "totals"
                          ? homeTeamObj.point.toFixed(1)
                          : ""}
                      </span>
                      <span>
                        {homePos
                          ? `+${Math.round(homeTotal / line.books.length)}`
                          : `-${Math.round(homeTotal / line.books.length)}`}
                      </span>
                      <span>
                        {homeTeamBestOdds
                          ? positiveOrNegativeSpread(homeTeamBestOdds[1])
                          : ""}
                      </span>
                    </StickyPill>
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

                        const containsBook = line.books.some(
                          (item) => item.key === bookmaker.key
                        );

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
            <div>Odds Last Updated</div>
            <div>Bet</div>
            <div>Market</div>
            <div>Odds</div>
            {homeModalInfo.outcomes.point && <div>Spread</div>}
            <div>No-Vig Odds</div>
            <div>Implied Win %</div>
            <div>EV %</div>
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
            <div>
              <div>{positiveOrNegativeSpread(homeModalInfo?.data?.home)}</div>
            </div>
            <div>{homeModalInfo?.data?.impliedWinPercentHome.toFixed(2)}%</div>
            <div>{homeModalInfo?.data?.evPercent}%</div>
            <div>{homeModalInfo?.data?.vig}%</div>
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
            <div>Odds Last Updated</div>
            <div>Bet</div>
            <div>Book</div>
            <div>Odds</div>
            {awayModalInfo.outcomes.point && <div>Spread</div>}
            <div>No-Vig Odds</div>
            <div>Implied Win %</div>
            <div>EV %</div>
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
            <div>{positiveOrNegativeSpread(awayModalInfo?.data?.away)}</div>
            <div>{awayModalInfo?.data?.impliedWinPercentAway.toFixed(2)}%</div>
            <div>{awayModalInfo?.data?.evPercent}%</div>
            <div>{awayModalInfo?.data?.vig}%</div>
          </ModalRow>
        </ModalRowContainer>
      </SpreadsModal>
    </div>
  );
}
