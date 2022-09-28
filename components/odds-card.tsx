import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

import {
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
  padding-bottom: 16px;

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
  padding: 14px;
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
    outcomes: [
      {
        name: "",
        price: 0,
        point: 0,
      },
      {
        name: "",
        price: 0,
        point: 0,
      },
    ],
  };
  const [isHomeOpen, setHomeIsOpen] = useState(false);
  const [isAwayOpen, setAwayIsOpen] = useState(false);
  const [homeModalInfo, setHomeModalInfo] = useState(initialState);
  const [awayModalInfo, setAwayModalInfo] = useState(initialState);

  const homeHandleOpen = ({ bookName, time, outcomes }) => {
    setHomeModalInfo({ bookName, time, outcomes });
    setHomeIsOpen(true);
  };

  const homeHandleClose = () => {
    setHomeIsOpen(false);
    setHomeModalInfo(initialState);
  };

  const awayHandleOpen = ({ bookName, time, outcomes }) => {
    setAwayModalInfo({ bookName, time, outcomes });
    setAwayIsOpen(true);
  };

  const awayHandleClose = () => {
    setAwayIsOpen(false);
    setHomeModalInfo(initialState);
  };

  console.log("awayModalInfo", awayModalInfo);

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
              const [homeSpread, awaySpread] = line.spread[0].line;

              return (
                <OddsContainer key={i}>
                  <>
                    <div>
                      {awayTeam}{" "}
                      {awaySpread && key !== "totals"
                        ? positiveOrNegativeSpread(awaySpread)
                        : key === "totals"
                        ? awaySpread
                        : ""}
                    </div>
                    <BookRow
                      style={{ width: awaySpreadWidth }}
                      ref={awaySpreadRef}
                    >
                      {bookmakers.map((bookmaker, i) => {
                        const { outcomes } = bookmaker.markets[0];

                        console.log(outcomes);

                        const { price, point } = outcomes[0];

                        const containsBook = line.books.includes(bookmaker);

                        return (
                          <div
                            onClick={() =>
                              containsBook
                                ? awayHandleOpen({
                                    bookName: bookmaker.title,
                                    time: bookmaker.last_update,
                                    outcomes,
                                  })
                                : ""
                            }
                            style={{
                              textAlign: "center",
                            }}
                            key={i}
                          >
                            {containsBook ? (
                              <Pill border>{formatOdds(price)}</Pill>
                            ) : (
                              <Pill border={false}>&nbsp;</Pill>
                            )}
                          </div>
                        );
                      })}
                    </BookRow>
                  </>
                  <>
                    <div>
                      {homeTeam}{" "}
                      {homeSpread && key !== "totals"
                        ? positiveOrNegativeSpread(homeSpread)
                        : key === "totals"
                        ? homeSpread
                        : ""}
                    </div>
                    <BookRow
                      style={{ width: homeSpreadWidth }}
                      ref={homeSpreadRef}
                    >
                      {bookmakers.map((bookmaker, i) => {
                        const { outcomes } = bookmaker.markets[0];

                        const { price, point } = outcomes[1];

                        const containsBook = line.books.includes(bookmaker);

                        return (
                          <div
                            onClick={() =>
                              containsBook
                                ? homeHandleOpen({
                                    bookName: bookmaker.title,
                                    time: bookmaker.last_update,
                                    outcomes,
                                  })
                                : ""
                            }
                            style={{
                              textAlign: "center",
                            }}
                            key={i}
                          >
                            {containsBook ? (
                              <Pill border>{formatOdds(price)}</Pill>
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
            {homeModalInfo.outcomes[0].point && <div>Spread</div>}
          </ModalRow>
          <ModalRow>
            <div>
              {new Date(homeModalInfo.time).toLocaleDateString()} -
              {new Date(homeModalInfo.time).toLocaleTimeString()}
            </div>
            <div>{homeModalInfo.outcomes[0].name}</div>
            <div>{homeModalInfo.bookName}</div>
            <div>{formatOdds(homeModalInfo.outcomes[0].price)}</div>
            {homeModalInfo.outcomes[0].point && (
              <div>
                {positiveOrNegativeSpread(homeModalInfo.outcomes[0].point)}
              </div>
            )}
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
            {awayModalInfo.outcomes[1].point && <div>Spread</div>}
          </ModalRow>
          <ModalRow>
            <div>
              {new Date(awayModalInfo.time).toLocaleDateString()} -
              {new Date(awayModalInfo.time).toLocaleTimeString()}
            </div>
            <div>{awayModalInfo.outcomes[1].name}</div>
            <div>{awayModalInfo.bookName}</div>
            {awayModalInfo.outcomes[1].point && (
              <div>
                {positiveOrNegativeSpread(awayModalInfo.outcomes[1].point)}
              </div>
            )}
            <div>{formatOdds(awayModalInfo.outcomes[1].price)}</div>
          </ModalRow>
        </ModalRowContainer>
      </SpreadsModal>
    </div>
  );
}
