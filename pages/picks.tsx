import React, { useState } from "react";
import { NextComponentType } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Layout from "../components/layout";
import { fetchAllPicks, fetchTrends } from "../hooks/index";
import Loader from "../components/loader";
import { fieldByIndex } from "../helpers/index";
import PicksMonth from "../components/picksMonth";

export default function Picks(props) {
  const { data, isLoading, isError } = useQuery<[]>(["picks"], () =>
    fetchAllPicks()
  );

  const getAllWinners = fieldByIndex(data, "winner");
  const getAllLosers = fieldByIndex(data, "loser");
  const [winners, _setWinners] = useState(getAllWinners);
  const [losers, _setLosers] = useState(getAllLosers);

  const formatPercent = (winners: number, losers: number) => {
    return `Record ${winners} / ${losers + winners} - ${Number(
      winners / (losers + winners)
    ).toFixed(3)}%`;
  };

  if (isError) {
    return <h3 className="center">Something went wrong. Please try again</h3>;
  }

  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Overall {formatPercent(winners, losers)}</p>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.map((item: any, i) => {
            return <PicksMonth key={i} index={i} item={item} />;
          })}
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("picks", fetchAllPicks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

Picks.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Picks">{page}</Layout>
    </>
  );
};
