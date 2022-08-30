import { server } from "../config";

export const fetchOdds = async (key: string | undefined) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/odds/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
  );
  return res.json();
};

export const fetchScores = async (key: string | undefined) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/scores/?daysFrom=1&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return res.json();
};

export const fetchAllSports = async () => {
  const res = await fetch(`${server}/api/sports`);
  const data = await res.json();
  return data;
};

export const fetchSingleSport = async (key: string | string[] | undefined) => {
  const res = await fetch(`${server}/api/sports/${key}`);
  const data = await res.json();
  return data;
};

export const fetchSportsNews = async () => {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_SPORTS_NEWS_API_KEY}&country=us&category=sports&language=en&domain=theringer,si,profootballtalk,thesportsrush`
  );
  return res.json();
};

// export const fetchFootball = async (key: string) => {
//   const res = await fetch(`${server}/${key}.json`);
//   return res;
// };
