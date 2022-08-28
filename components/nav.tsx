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

    @media (max-width: 480px) {
      grid-template-rows: 1fr auto;
      grid-template-columns: 1fr;
    }
  }

  li {
    color: white;
    order: 1;
  }

  @media (max-width: 480px) {
    li:nth-child(3) {
      order: -1;
      margin-bottom: -40px;
    }

    li:last-child {
      margin-bottom: 20px;
    }
  }

  .logo {
    transform: translateY(-25%);

    @media (max-width: 480px) {
      transform: translateY(-6%);
    }
  }

  a {
    font-size: 3rem;
    text-decoration: none;
    color: var(--white);

    &:hover {
      color: var(--black);
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
