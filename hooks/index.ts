import { server } from "../config";
import { data } from "../football";
import { useQuery } from "react-query";
import { isBefore, addDays } from "date-fns";

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

export const useFetchOdds = (filters) => {
  // Notice we only use `employees` as query key, because we want to preserve our cache
  return useQuery(
    ["odds"],
    () => fetchOdds(filters),
    // We pass a third argument to our useQuery function, an options object
    {
      select: (odds) => {
        if (Object.entries(filters).length === 0) {
          return (
            odds?.length > 0 &&
            odds?.filter((item: { commence_time: string | number | Date }) =>
              isBefore(
                new Date(item.commence_time),
                addDays(new Date(data[0]?.commence_time), 6)
              )
            )
          );
        } else {
          return odds
            ?.filter((item: { commence_time: string | number | Date }) =>
              isBefore(
                new Date(item.commence_time),
                addDays(new Date(data[0]?.commence_time), 6)
              )
            )
            .filter(
              (odd) =>
                odd.home_team.toLowerCase().includes(filters.toLowerCase()) ||
                odd.away_team.toLowerCase().includes(filters.toLowerCase())
            );
        }
      },
    }
  );
};

// export const fetchFootball = async (key: string) => {
//   const res = await fetch(`${server}/${key}.json`);
//   return res;
// };
