import React from "react";
import styled from "styled-components";
import logo from "/images/logo.svg";
import Image from "next/image";

const LogoStyles = styled.div`
  font-size: clamp(1px, 0.65vw, 8px);
  background-size: 150em;
  transform: translateY(-25%);
`;

export default function Logo() {
  return (
    <LogoStyles>
      <Image src={logo.src} alt="All Spreads" width={150} height={150} />
    </LogoStyles>
  );
}
