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
    case "soccer":
      return "soccer_epl";
    default:
      break;
  }
}

export function createBookmakerURL(path) {
  switch (path) {
    case "unibet":
      return "https://www.unibet.com";
    case "fanduel":
      return "https://www.fanduel.com";
    case "sugarhouse":
      return "https://pa.playsugarhouse.com/?page=landing&l=RiversPhiladelphia";
    case "betrivers":
      return "https://www.betrivers.com";
    case "barstool sportsbook":
      return "https://www.barstoolsportsbook.com";
    case "lowvig.ag":
      return "https://www.lowvig.ag";
    case "draftkings":
      return "https://www.draftkings.com";
    case "william hill (us)":
      return "https://www.williamhill.com";
    case "betus":
      return "https://www.betus.com.pa/";
    case "gtbets":
      return "https://www.gtbets.ag";
    case "wynnbet":
      return "https://www.wynninteractive.com/wynnbet/";
    case "mybookie.ag":
      return "https://www.mybookie.ag/";
    case "pointsbet (us)":
      return "https://help.pointsbet.com/hc/en-us";
    case "fox bet":
      return "https://www.foxbet.com";
    case "betmgm":
      return "https://promo.nj.betmgm.com/en/promo/geolocator?orh=www.betmgm.com";
    case "betfair":
      return "https://www.betfair.com";
    case "bovada":
      return "https://www.bovada.com";
    case "circa sports":
      return "https://www.circasports.com/";
    case "intertops":
      return "https://www.onlinesportsbookchief.com/games/intertops/";
    default:
      break;
  }
}

export function getFilePrefix(string) {
  switch (string) {
    case "football":
      return "nfl";
    case "baseball":
      return "mlb";
    case "books":
      return "books";
    case "college-football" || "college-basketball":
      return "ncaa";
    default:
      break;
  }
}

export function toBase64(str) {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

export const formatName = (name: string, slug) => {
  if (slug === "books") {
    return `/${getFilePrefix(slug)}/${name
      .split(" ")
      .join("")
      .toLowerCase()}.svg`;
  }

  if (slug === "college-football" || slug === "college-basketball") {
    return `/${getFilePrefix(slug)}/${name
      .split(" ")
      .join("-")
      .toLowerCase()}.png`;
  }

  return `/${getFilePrefix(slug)}/${name
    .split(" ")
    .join("-")
    .toLowerCase()}.svg`;
};

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

export function getAllPageSlugs() {
  const data = [
    {
      id: "1",
      slug: "football",
    },
    {
      id: "2",
      slug: "baseball",
    },
    {
      id: "3",
      slug: "hockey",
    },
    {
      id: "4",
      slug: "basketball",
    },
    {
      id: "5",
      slug: "college-football",
    },
    {
      id: "6",
      slug: "college-basketball",
    },
    {
      id: "7",
      slug: "golf",
    },
    {
      id: "8",
      slug: "soccer",
    },
  ];

  return data.map((item) => {
    return {
      params: {
        sport: item.slug,
      },
    };
  });
}

export function positiveOrNegativeSpread(item) {
  return Number(item) > 0 ? `+${item}` : `${item}`;
}
