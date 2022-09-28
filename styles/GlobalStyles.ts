import { createGlobalStyle } from "styled-components";
import "normalize.css";

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2E2E2E;
    --green: #39b54a;
    --white: #fff;
    --grey: #efefef;
  }

  html {
    background-image: url('/bg.svg');
    background-size: 450px;
    background-attachment: fixed;
    font-size: 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--green) var(--white);
     font-family: Empirez, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: var(--black);
  }

  body {
    font-size: 2rem;
  }

  fieldset {
    border-color: rgba(0,0,0,0.1);
    border-width: 1px;
  }

  button {
    background: var(--green);
    color: white;
    border: 0;
    padding: 0.6rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    --cast: 2px;
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    transition: all 0.2s;
    &:hover {
      --cast: 4px;
    }
  }

  .image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }

  /* Scrollbar Styles */
  body::-webkit-scrollbar {
    width: 12px;
  }

  body::-webkit-scrollbar-track {
    background: var(--white);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--green) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  hr {
    border: 0;
    height: 8px;
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    transform: rotate(-2deg);
    position: relative;
    display: inline-block;
  }

  @font-face {
    font-family: 'Empirez';
    font-display: swap;
    src: url('/Empirez.woff') format('woff');
    font-weight: 400;
  }

  p,
  li {
    line-height: 1.5;
    letter-spacing: 0.5px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    margin: 0;
  }

  a {
    color: var(--black);
    text-decoration-color: var(--green);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
  }

  mark,
  .mark {
    background: var(--green);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
    display: flex,
    width: 100%,
    marginTop: 50px,
    flexDirection: column,
    justifyContent: center,
    alignItems: center,
  }

  .winner {
    color: var(--green);
    padding: 2px;
  }

  .loser {
    color: #c72534;
    padding: 2px;
  }

  .show {
    display: block;
    transition: 0.5s;
    margin-top: 20px;
  }
  .hide {
    display: none;
    transition: 0.5s;
  }

.book-anchor {
  position: relative;
}

.book-anchor > .visuallyhidden {
    visibility: hidden;
    opacity:  0;
    position: absolute;
    bottom: -40px;
    left: -25px;
    z-index: 10;
    text-align: center;
    padding: 5px;
    width: 90px;
    height: auto;
    background: var(--grey);
    color: var(--black);
    font-size: 16px;
    position: absolute;
    bottom: -34px;
    left: -22px;
    z-index: 10;
    text-align: center;
    padding: 10px;
    width: 90px;
    height: auto;
    background: var(--black);
    color: var(--white);
    font-size: 16px;
    border-radius: 8px;
    text-decoration: underline;
    outline: 2px solid var(--black);
}

.book-anchor:hover .visuallyhidden {
    visibility: visible;
    opacity: 1;
}

.ReactModal__Overlay {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 500ms ease-in-out;
  z-index: 10;
}

.ReactModal__Body--open  {
      overflow: hidden;
      height: 100vh;
    }

.ReactModal__Overlay--after-open {
  opacity: 1;
  transform: translateX(0px);
  transition: all 500ms ease-in-out;
}

.ReactModalPortal {
  transition: all 500ms ease-in-out;
}

.ReactModal__Overlay--before-close {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 500ms ease-in-out;
}

`;

export default GlobalStyles;
