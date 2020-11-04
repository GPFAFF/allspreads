import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  text-align: center;
`;

const Footer = () => (
  <FooterStyles>
    <p>
      &copy; AllSpreads -
      {' '}
      {new Date().getFullYear()}
    </p>
  </FooterStyles>
);

export default Footer;
