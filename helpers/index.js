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
    src: "/football.webp",
    odds: footballData,
  },
  {
    id: "2",
    name: "Baseball",
    slug: "baseball",
    src: "/baseball.webp",
  },
  {
    id: "3",
    name: "Hockey",
    slug: "hockey",
    src: "/hockey.webp",
  },
  {
    id: "4",
    name: "Basketball",
    slug: "basketball",
    src: "/basketball.webp",
  },
  {
    id: "5",
    name: "College Football",
    slug: "college-football",
    src: "/cfb.webp",
  },
  {
    id: "6",
    name: "College Basketball",
    slug: "college-basketball",
    src: "/ncaabb.webp",
  },
  {
    id: "7",
    name: "Golf",
    slug: "golf",
    src: "/golf.webp",
  },
  {
    id: "8",
    name: "Soccer",
    slug: "soccer",
    src: "/soccer.webp",
  },
];

export function positiveOrNegativeSpread(item) {
  return Number(item) > 0 ? `+${item}` : `${item}`;
}
