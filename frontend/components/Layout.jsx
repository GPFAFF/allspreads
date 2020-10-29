import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

import 'normalize.css';

const SiteBorderStyles = styled.div`
  max-width: 95vw;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  background: green;
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
`;

const ContentStyles = styled.div`
  padding: 2rem;
  background-color: white;
  ;
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Typography />
    <SiteBorderStyles>
      <ContentStyles>
        <Nav />
        <Header />
        { children }
        <Footer />
      </ContentStyles>
    </SiteBorderStyles>
  </>
);

export default Layout;
