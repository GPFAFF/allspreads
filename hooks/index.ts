import { server } from "../config";
import { useQuery } from "react-query";
import { isBefore, addDays } from "date-fns";
import { useCallback } from "react";

export const fetchOdds = async (key: string | undefined) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/odds/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
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

export const fetchAllSports = async () => {
  const res = await fetch(`${server}/api/sports`);
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

export const fetchSportsNews = async () => {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_SPORTS_NEWS_API_KEY}&country=us&category=sports&language=en&domain=theringer,si,profootballtalk,thesportsrush`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const initialSortedData = (data: any[]) => {
  console.log("initialSortedData", data);
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

export const useFetchOdds = (key: string, filters: string) => {
  return useQuery(["odds"], () => fetchOdds(key), {
    select: useCallback(
      (odds) => {
        return !filters.length
          ? initialSortedData(odds)
          : filteredData(odds, filters);
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
