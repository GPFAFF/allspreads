import React from "react";
import { NextComponentType } from "next";
import styled from "styled-components";

import Layout from "../components/layout";

const StyledLink = styled.a`
  padding: 20px;
  background-color: var(--green);
  border-radius: 4px;
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  background: var(--grey);
  border: 0;
  outline: 0;
  flex: 1;
  border-radius: 4px;
  margin: 0 4px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--black);
  border: 2px solid var(--green);
`;

const ToolsContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 300px 300px 300px;
  padding: 40px;
`;
export default function News() {
  return (
    <div className="center">
      <h2>Tools</h2>
      <ToolsContainer>
        <StyledLink href="/tools/no-vig-calculator">
          No Vig Calculator
        </StyledLink>
        <StyledLink href="/tools/parlay-calculator">
          Parlay Calculator
        </StyledLink>
      </ToolsContainer>
    </div>
  );
}

News.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="News">{page}</Layout>
    </>
  );
};
