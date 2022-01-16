import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Logo from "./Logo";

const NavStyles = styled.nav`
  background: var(--green);
  margin-bottom: 3rem;

  ul {
    display: grid;
    /* grid-template-columns: 1fr 1fr auto 1fr 1fr; */
    justify-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    align-items: center;
    gap: 2rem;
  }

  li {
    color: white;
    order: 1;
  }

  .logo {
    transform: translateY(-25%);
  }

  a {
    font-size: 3rem;
    text-decoration: none;
    color: var(--white);

    &:hover {
      color: var(--grey);
    }
    &[aria-current="page"] {
      color: var(--black);
    }
  }
`;

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
