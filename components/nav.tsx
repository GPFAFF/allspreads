import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

import Logo from "./logo";

const NavStyles = styled.nav`
  background: var(--green);
  margin-bottom: 3rem;

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto 1fr 1fr 1fr;
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

    &.active {
      > a {
        color: var(--black);
      }
    }
  }

  @media (max-width: 480px) {
    li:nth-child(4) {
      order: -1;
      margin-bottom: -40px;
    }

    li:last-child {
      margin-bottom: 20px;
    }
  }

  .logo {
    transform: translateY(-45%);

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
      cursor: pointer;
    }
  }
`;

export default function Nav() {
  const router = useRouter();

  return (
    <NavStyles>
      <ul>
        <li className={router.pathname == "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={router.pathname.startsWith("/sports") ? "active" : ""}>
          <Link href="/sports">Sports</Link>
        </li>
        <li className={router.pathname.startsWith("/odds") ? "active" : ""}>
          <Link href="/odds">Odds</Link>
        </li>
        <li>
          <Logo />
        </li>
        <li className={router.pathname == "/news" ? "active" : ""}>
          <Link href="/news">News</Link>
        </li>
        <li className={router.pathname.startsWith("/blog") ? "active" : ""}>
          <Link href="/blog">Blog</Link>
        </li>
        <li className={router.pathname.startsWith("/picks") ? "active" : ""}>
          <Link href="/picks">picks</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
