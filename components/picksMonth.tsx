import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { fieldByIndex } from "../helpers/index";

type Props = {
  item: any;
  index: any;
};

const Row = styled.div`
  padding: 20px;
  background: var(--gray);
  border-radius: 4px;
  border: 8px solid var(--green);
  margin: 20px;
`;

export default function PicksMonth(props: Props) {
  const { item, index } = props;
  const { picks } = item;

  const [rowShown, setRowShown] = useState(false);

  const getAllWinners = item.picks.filter(
    (item) => item.result === "winner"
  ).length;
  const getAllLosers = item.picks.filter(
    (item) => item.result === "loser"
  ).length;

  const [winners, _setWinners] = useState(getAllWinners);
  const [losers, _setLosers] = useState(getAllLosers);

  const formatPercent = (winners: number, losers: number) => {
    if (winners === 0 && losers === 0) return "Record 0%";
    return `Record ${winners} / ${losers + winners} - ${Number(
      winners / (losers + winners)
    ).toFixed(3)}%`;
  };

  const handleClick = () => {
    setRowShown(!rowShown);
  };

  return (
    <Row onClick={handleClick} key={item.month}>
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {item.month} - {formatPercent(winners, losers)}
        <span>
          {rowShown ? (
            <FaArrowCircleDown
              fill="#39b54a"
              style={{ display: "flex", paddingLeft: "10px" }}
              size={25}
            />
          ) : (
            <FaArrowCircleUp
              fill="#39b54a"
              style={{ display: "flex", paddingLeft: "10px" }}
              size={25}
            />
          )}
        </span>
      </h3>
      <div key={index}>
        <>
          {rowShown && (
            <div key={index}>
              {picks.map((pick, i) => (
                <div key={i} className={pick.result ? pick.result : ""}>
                  {pick.date} - {pick.team} {pick.odds}
                </div>
              ))}
            </div>
          )}
        </>
      </div>
    </Row>
  );
}
