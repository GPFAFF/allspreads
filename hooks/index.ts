import { server } from "../config";
import { useQuery } from "react-query";
import { isBefore, addDays } from "date-fns";
import { useCallback, useMemo } from "react";

export const fetchOdds = async (
  key: string | undefined,
  markets: string | undefined
) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/odds/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&regions=us,eu&markets=${markets}&oddsFormat=american`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchScores = async (key: string | undefined) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/scores/?daysFrom=1&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchAllPicks = async () => {
  const res = await fetch(`${server}/api/picks`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

export const fetchAllSports = async () => {
  const res = await fetch(`${server}/api/sports`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

export const fetchTrends = async () => {
  const res = await fetch(`${server}/api/trends`);
  console.log("res", res);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

export const fetchSingleSport = async (key: string | string[] | undefined) => {
  const res = await fetch(`${server}/api/sports/${key}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

let mapped = {};

export const fetchSportsNews = async (page) => {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_SPORTS_NEWS_API_KEY}&country=us&category=sports&language=en&domain=espn,si,profootballtalk&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const initialSortedData = (data: any[]) => {
  return (
    data?.length > 0 &&
    data.filter((item: { commence_time: string | number | Date }) =>
      isBefore(
        new Date(item.commence_time),
        addDays(new Date(data[0]?.commence_time), 6)
      )
    )
  );
};

const filteredData = (data: any[], filters: string) => {
  return data
    .filter((item: { commence_time: string | number | Date }) =>
      isBefore(
        new Date(item.commence_time),
        addDays(new Date(data[0]?.commence_time), 6)
      )
    )
    .filter(
      (odd: { home_team: string; away_team: string }) =>
        odd.home_team.toLowerCase().includes(filters.toLowerCase()) ||
        odd.away_team.toLowerCase().includes(filters.toLowerCase())
    );
};

export const transformOdds = (data) => {
  return data.map((item) => {
    let mapped = {};
    const { bookmakers } = item;

    return {
      id: item.id,
      teams: [item.away_team, item.home_team],
      time: item.commence_time,
      bookmakers: bookmakers.sort((a, b) => {
        if (a.key < b.key) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        }
        return 0;
      }),
      lines: [
        ...bookmakers
          .reduce(function (arr, obj) {
            let current =
              mapped[obj.markets[0].outcomes.map((item) => item.point)];
            if (!current) {
              current = {
                spread: [
                  { line: obj.markets[0].outcomes.map((item) => item.point) },
                ],
                books: [],
              };

              mapped[obj.markets[0].outcomes.map((item) => item.point)] =
                current;

              arr.push(current);
            }
            current.books.push(obj);

            return arr;
          }, [])
          .sort((a, b) => {
            const spreadTwo = b.spread[0].line[0];
            const spreadOne = a.spread[0].line[0];
            if (spreadTwo < spreadOne) {
              return -1;
            }
            if (spreadTwo > spreadOne) {
              return 1;
            }
            return 0;
          }),
      ],
    };
  });
};

export const initialFilteredOdds = (data: any[]) => {
  return (
    data?.length > 0 &&
    data.filter((item: { time: string | number | Date }) =>
      isBefore(new Date(item.time), addDays(new Date(data[0]?.time), 6))
    )
  );
};

export const filteredOdds = (data: any[], filters: string) => {
  return data
    .filter((item: { time: string | number | Date }) =>
      isBefore(new Date(item.time), addDays(new Date(data[0]?.time), 6))
    )
    .filter((odd) => {
      const [awayTeam, homeTeam] = odd?.teams;
      return (
        awayTeam.toLowerCase().includes(filters.toLowerCase()) ||
        homeTeam.toLowerCase().includes(filters.toLowerCase())
      );
    });
};

export const useFetchOdds = (key: string, active, filters: string) => {
  return useQuery(["odds", active], () => fetchOdds(key, active), {
    select: useCallback(
      (odds) => {
        return !filters.length
          ? initialFilteredOdds(transformOdds(odds))
          : filteredOdds(transformOdds(odds), filters);
      },
      [filters]
    ),
  });
};

export const useFetchScores = (key: string, filters: string) => {
  return useQuery(["scores"], () => fetchScores(key), {
    select: useCallback(
      (scores) => {
        return !filters.length
          ? initialSortedData(scores)
          : filteredData(scores, filters);
      },
      [filters]
    ),
  });
};
