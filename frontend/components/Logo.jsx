import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';

const LogoStyles = styled.div`
  font-size: clamp(1px, 0.65vw, 8px);
  height: 30em;
  width: 30em;
  background-size: 150em;
`;

const Logo = () => (
  <LogoStyles>
    <img
      className="logo"
      src={logo}
      alt="All Spreads"
    />
  </LogoStyles>
);

export default Logo;
