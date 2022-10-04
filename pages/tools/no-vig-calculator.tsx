import { NextComponentType } from "next";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import Layout from "../../components/layout";
import {
  calculateProbability,
  calculateVigPercentage,
} from "../../helpers/index";
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
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 10px;
  margin: 20px auto;

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
      margin-bottom: 40px;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 1fr;

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
export default function NoVigCalculator(props: Props) {
  const initialState = {
    oddsTeamOne: "",
    oddsTeamTwo: "",
    noVigOddsTeamOne: "",
    noVigOddsTeamTwo: "",
    impliedWinPercentageTeamOne: 0,
    impliedWinPercentageTeamTwo: 0,
  };

  const [calculatorState, setCalculatorState] = useState(initialState);

  useEffect(() => {
    if (
      calculatorState.oddsTeamOne === "-" ||
      calculatorState.oddsTeamTwo === "-"
    )
      return;

    if (
      calculatorState.oddsTeamOne.length > 2 ||
      calculatorState.oddsTeamTwo.length > 2
    ) {
      const favorite = calculateProbability(calculatorState.oddsTeamOne);
      const underdog = calculateProbability(calculatorState.oddsTeamTwo);
      const data = calculateVigPercentage(favorite, underdog);

      setCalculatorState({
        oddsTeamOne: calculatorState.oddsTeamOne,
        oddsTeamTwo: calculatorState.oddsTeamTwo,
        noVigOddsTeamOne: data.favorite,
        noVigOddsTeamTwo: data.underdog,
        impliedWinPercentageTeamOne: data.impliedWinPercentFavorite * 100,
        impliedWinPercentageTeamTwo: data.impliedWinPercentUnderdog * 100,
      });
    } else {
      const favorite = calculateProbability(0);
      const underdog = calculateProbability(0);
      const data = calculateVigPercentage(favorite, underdog);

      setCalculatorState({
        oddsTeamOne: calculatorState.oddsTeamOne,
        oddsTeamTwo: calculatorState.oddsTeamTwo,
        noVigOddsTeamOne: data.favorite,
        noVigOddsTeamTwo: data.underdog,
        impliedWinPercentageTeamOne: data.impliedWinPercentFavorite * 100,
        impliedWinPercentageTeamTwo: data.impliedWinPercentUnderdog * 100,
      });
    }
  }, [calculatorState.oddsTeamOne, calculatorState.oddsTeamTwo]);

  const handleChange = (event) => {
    console.log("event", event.currentTarget.name);
    const { name, value } = event.currentTarget;

    setCalculatorState({ ...calculatorState, [name]: value });
  };

  return (
    <Container>
      <CenterTitle>
        No-Vig / Vig-Free Fair Odds Calculator
        <StyledLink href="/tools">Back</StyledLink>
      </CenterTitle>
      <InfoContainer>
        <div>
          <p>How do I work?</p>
          <div>
            A No-Vig Odds Calculator lets remove the vig, applied by Sportsbook
            to generate an edge over the bettor. Enter the odds of both sides of
            the potential bet. The vig-free odds and no-vig probabilities will
            return as enter the odds of both sides of a bet and generate vig
            free odds to see the actual implied probabilities win percentage you
            are getting.
          </div>
        </div>
        <div>
          <p>Why use this calculator?</p>
          <div>
            Odds are all based on probability. They are created by some of the
            sharpest bettors and linesmakers in the world. In order to see your
            true value of your wager, removing the vig will give you a better
            understanding of the probability of your bet cashing. Sportsbooks
            make their edge by creating a vig. Locking in a wagers where your
            positive expected value winning percentages are higher than what
            Sportsbooks are offering is a long term path to success.
          </div>
        </div>
      </InfoContainer>
      <CalculatorContainer>
        <CalculatorRow>
          <Input
            type="number"
            handleChange={handleChange}
            name="oddsTeamOne"
            labelName="Team One Odds"
            placeHolder="-110"
            value={calculatorState.oddsTeamOne}
            readOnly={false}
          />
          <Input
            type="text"
            handleChange={handleChange}
            name="noVigOddsTeamOne"
            labelName="Team One No-Vig Odds"
            value={calculatorState.noVigOddsTeamOne}
            placeHolder="100"
            readOnly
          />
          <Input
            type="text"
            handleChange={handleChange}
            name="impliedWinPercentageTeamOne"
            labelName="Team One Implied Win %"
            value={`${calculatorState.impliedWinPercentageTeamOne.toFixed(
              2
            )} %`}
            placeHolder="50%"
            readOnly
          />
        </CalculatorRow>
        <CalculatorRow>
          <Input
            type="number"
            handleChange={handleChange}
            name="oddsTeamTwo"
            labelName="Team Two Odds"
            value={calculatorState.oddsTeamTwo}
            placeHolder="-110"
            readOnly={false}
          />
          <Input
            type="text"
            handleChange={handleChange}
            value={calculatorState.noVigOddsTeamTwo}
            name="noVigOddsTeamTwo"
            labelName="Team Two No-Vig Odds"
            placeHolder="100"
            readOnly
          />
          <Input
            type="text"
            handleChange={handleChange}
            value={`${calculatorState.impliedWinPercentageTeamTwo.toFixed(
              2
            )} %`}
            name="impliedWinPercentageTeamTwo"
            labelName="Team Two Implied Win %"
            placeHolder="50%"
            readOnly
          />
        </CalculatorRow>
      </CalculatorContainer>
    </Container>
  );
}

NoVigCalculator.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout
        description="No-Vig / Vig-Free odds calculator for fair odds sports betting"
        title="No-Vig / Vig-Free odds calculator for fair odds sports betting"
      >
        {page}
      </Layout>
    </>
  );
};
