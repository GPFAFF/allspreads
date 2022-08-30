import React from "react";
import { useQuery } from "react-query";
import List from "../components/list";
import Layout from "../components/layout";
import { fetchAllSports } from "../hooks";
import Loader from "../components/loader";
import { NextComponentType } from "next";
import { Sport } from "../types";

export default function Sports() {
  const { data, isLoading } = useQuery<Sport[]>(["sports"], () =>
    fetchAllSports()
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <List sportsList={data} />
    </>
  );
}

Sports.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
