import React from "react";
import styled from "styled-components";

import Nav from "./nav";
import Header from "./header";
import Footer from "./footer";
import SEO from "./seo";

const SiteBorderStyles = styled.div`
  max-width: 95vw;
  margin: 12rem auto 4rem auto;
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  background: var(--green);
  padding: clamp(5px, 1vw, 25px);
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
`;

const ContentStyles = styled.div`
  padding: 1rem;
  background-color: white;
`;

export default function Layout({ children, title, description }) {
  return (
    <>
      <SEO
        description={
          children?.props?.source?.scope.summary ||
          description ||
          "All Spreads. All the Time. Your daily source for bets, betting, spreads and sports news"
        }
        title={title}
      />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          <Header />
          {children}
        </ContentStyles>
      </SiteBorderStyles>
      <Footer />
    </>
  );
}
