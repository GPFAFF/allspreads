import Football from "/public/images/football.webp";
import Hockey from "/public/images/hockey.webp";
import Basketball from "/public/images/basketball.webp";
import Golf from "/public/images/golf.webp";
import Soccer from "/public/images/soccer.webp";
import Baseball from "/public/images/baseball.webp";
import CollegeFootball from "/public/images/cfb.webp";
import CollegeBasketball from "/public/images/ncaabb.webp";
import footballData from "../football.json";

export function getPath(path) {
  switch (path) {
    case "football":
      return "americanfootball_nfl";
    case "basketball":
      return "basketball_nba";
    case "college-football":
      return "americanfootball_ncaaf";
    case "college-basketball":
      return "basketball_ncaab";
    case "baseball":
      return "baseball_mlb";
    case "hockey":
      return "icehockey_nhl";
    default:
      break;
  }
}

export function toBase64(str) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const data = [
  {
    id: "1",
    name: "Football",
    slug: "football",
    src: Football.src,
    odds: footballData,
  },
  {
    id: "2",
    name: "Baseball",
    slug: "baseball",
    src: Baseball.src,
  },
  {
    id: "3",
    name: "Hockey",
    slug: "hockey",
    src: Hockey.src,
  },
  {
    id: "4",
    name: "Basketball",
    slug: "basketball",
    src: Basketball.src,
  },
  {
    id: "5",
    name: "College Football",
    slug: "college-football",
    src: CollegeFootball.src,
  },
  {
    id: "6",
    name: "College Basketball",
    slug: "college-basketball",
    src: CollegeBasketball.src,
  },
  {
    id: "7",
    name: "Golf",
    slug: "golf",
    src: Golf.src,
  },
  {
    id: "8",
    name: "Soccer",
    slug: "soccer",
    src: Soccer.src,
  },
];

export function positiveOrNegativeSpread(item) {
  return Number(item) > 0 ? `+${item}` : `${item}`;
}
