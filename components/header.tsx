import React from "react";
import styled from "styled-components";

const HeaderStyles = styled.h1`
  text-align: center;
  margin-bottom: 6rem;
`;

export default function Header() {
  return (
    <div>
      <HeaderStyles>AllSpreads</HeaderStyles>
    </div>
  );
}
