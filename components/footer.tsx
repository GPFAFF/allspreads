import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterStyles>
      <p>&copy; AllSpreads - {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
