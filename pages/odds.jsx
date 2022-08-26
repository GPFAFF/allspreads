import React from "react";
import List from "../components/list";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import { fetchAllSports } from "../hooks";

export default function Odds() {
  const { data, isLoading } = useQuery(['sports'], () => fetchAllSports());

  if (isLoading) return <>....</>;

  return (
    <>
      <List data={data} />
    </>
  );
}

Odds.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};
