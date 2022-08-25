import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "./logo";

const NavStyles = styled.nav`
  background: var(--green);
  margin-bottom: 3rem;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
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

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sports">Sports</Link>
        </li>
        <li>
          <Logo />
        </li>
        <li>
          <Link href="/odds">Odds</Link>
        </li>
        <li>
          <Link href="/picks">Picks</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
