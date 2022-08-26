import React from "react";
import { useQuery } from "react-query";
import List from "../components/list";
import Layout from "../components/layout";
import { fetchAllSports } from "../hooks";
import Loader from "../components/loader";
export default function Sports() {
  const { data, isLoading } = useQuery(['sports'], () => fetchAllSports());

  if (isLoading) return <Loader />;

  return (
    <>
      <List data={data} />
    </>
  );
}

Sports.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};
