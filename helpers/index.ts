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
      return "soccer";
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
