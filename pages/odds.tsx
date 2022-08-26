import React from "react";
import { NextComponentType } from "next";

import List from "../components/list";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import { fetchAllSports } from "../hooks";
import Loader from "../components/loader";
import { Sport } from "../types";

export default function Odds() {
  const { data, isLoading } = useQuery<Sport[]>(['sports'], () => fetchAllSports());

  if (isLoading) return <Loader />;

  return (
    <>
      <List sportsList={data} />
    </>
  );
}

Odds.getLayout = function getLayout(page: NextComponentType) {
  return <Layout>{page}</Layout>
};
