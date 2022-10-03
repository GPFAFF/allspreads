import React from "react";
import styled from "styled-components";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const FooterStyles = styled.footer`
  text-align: center;

  > a {
    margin: 16px;
    transform: scale(1);
    transition: 0.5s;

    &:hover {
      transform: scale(1.01);
      transition: 0.5s;
      cursor: pointer;
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <a
        target="_blank"
        href="https://instagram.com/allspreads"
        rel="noreferrer"
      >
        <FaInstagram size={40} />
      </a>
      <a target="_blank" href="https://twitter.com/allspreads" rel="noreferrer">
        <FaTwitter size={40} />
      </a>
      <p>&copy; AllSpreads - {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
