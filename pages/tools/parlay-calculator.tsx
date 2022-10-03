import { NextComponentType } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/layout";

import { FaWindowClose } from "react-icons/fa";

import { CenterTitle } from "../../styles/components";
import Input from "../../components/input";
import Link from "next/link";

type Props = {};

const CalculatorContainer = styled.div`
  display: grid;
  text-align: center;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  background-color: var(--grey);
  border: 2px solid var(--green);
  margin: 20px 0;
  border-radius: 4px;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    order: 1;
  }
`;

const CalculatorRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  width: 100%;
  gap: 10px;
  margin: 20px auto;
  justify-content: center;

  > h3 {
    margin-top: 0;
  }

  @media (max-width: 600px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    margin: 0 auto;
  }
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: start;
  justify-content: center;
  margin: 20px auto;
  gap: 20px;

  > div {
    border: 2px solid var(--green);
    padding: 20px;
    background-color: var(--grey);
    border-radius: 4px;
    min-height: 340px;
  }

  @media (max-width: 600px) {
    display: block;
    grid-template-columns: auto;

    > div:first-child {
      margin-bottom: 20px;
    }
  }
`;

const Container = styled.div`
  > h2 > a {
    display: block;
    margin: 20px auto;
  }

  @media (max-width: 600px) {
    grid-template-rows: 80px 1fr 1fr;

    > div:last-child {
      order: 1;
    }

    > div {
      order: 2;
    }
  }
`;

const StyledLink = styled(Link)`
  display: block;
  margin: 20px auto;
  font-size: 70px;
`;

const StyledIcon = styled(FaWindowClose)`
  position: absolute;
  top: 20px;
  right: 10px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    right: 40px;
  }
`;
export default function ParlayCalculator(props: Props) {
  const initialState = [{ value: "" }];

  const [calculatorState, setCalculatorState] = useState(initialState);

  const handleChange = (event, index) => {
    const { name, value } = event.currentTarget;

    const list = [...calculatorState];
    list[index].value = value;
    setCalculatorState(list);
  };

  const removeOdds = (index) => {
    const list = [...calculatorState];
    list.splice(index, 1);
    setCalculatorState(list);
  };

  const handleClick = () => {
    setCalculatorState([
      ...calculatorState,
      {
        value: "",
      },
    ]);
  };

  const calculatePayout = (odds) => {
    if (odds.length === 1) return 0;
    const decimalOdds = odds
      .filter((odd) => odd.value !== "")
      .map((odd) => {
        const oddsNumber = Number(odd.value);

        if (oddsNumber === 0) return 0;

        if (oddsNumber > 0) {
          return oddsNumber / 100 + 1;
        }

        return (100 / oddsNumber) * -1 + 1;
      })
      .reduce((m, n) => m * n);

    return decimalOdds;
  };

  const [betAmount, setBetAmount] = useState(0);

  const handleBetAmount = (event) => {
    setBetAmount(event.target.value);
  };

  return (
    <Container>
      <CenterTitle>
        Parlay Calculator
        <StyledLink href="/tools">Back</StyledLink>
      </CenterTitle>
      <InfoContainer>
        <div>
          <p>How do I work?</p>
          <ul>
            <li>Enter bet amount</li>
            <li>
              Enter the moneyline of your plays 2. Favorites = Add minus (-150)
            </li>
            <li>Underdogs = Number only (160)</li>
            <li>Add or remove the number of games you would like</li>
            <li>
              See the amount you could potentially win by changing odds or
              number of games selected
            </li>
          </ul>
        </div>
        <div>
          <p>What is a parlay?</p>
          <div>
            A parlay is a series of two or more bets so set up in advance that
            the original stake plus its winnings are risked on the successive
            wagers. Odds are increased with added number of selections because
            your chances of winning probability goes down with each leg (team or
            bet) that you add. Parlays are enticing but are not a profitable
            betting strategy.
          </div>
        </div>
      </InfoContainer>
      <CalculatorContainer>
        <Input
          type="number"
          handleChange={handleBetAmount}
          name="betAmount"
          labelName="Bet Amount"
          placeHolder="$ 100"
          readOnly={false}
          value={betAmount}
        />
        <h2>
          Payout ${" "}
          {(calculatePayout(calculatorState) * betAmount).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </h2>
        <CalculatorRow>
          {calculatorState.map((calculator, index) => {
            return (
              <div style={{ position: "relative" }} key={index}>
                {calculatorState.length > 1 && (
                  <StyledIcon onClick={() => removeOdds(index)} size={25} />
                )}
                <Input
                  type="number"
                  handleChange={(event) => handleChange(event, index)}
                  name={`oddsTeam${index + 1}`}
                  labelName={`Game ${index + 1} Odds`}
                  placeHolder="-110"
                  readOnly={false}
                  value={calculator.value}
                />
                {calculatorState.length - 1 === index && (
                  <button style={{ margin: "10px 0" }} onClick={handleClick}>
                    Add Game
                  </button>
                )}
              </div>
            );
          })}
        </CalculatorRow>
      </CalculatorContainer>
    </Container>
  );
}

ParlayCalculator.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Parlay odds calculator for sports betting">{page}</Layout>
    </>
  );
};
