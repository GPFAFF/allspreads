import React from "react";
import { NextComponentType } from "next";
import { useQuery } from "react-query";

import List from "../components/list";
import Layout from "../components/layout";
import { fetchAllSports } from "../hooks";
import Loader from "../components/loader";
import { Sport } from "../types";

export default function Odds() {
  const { data, isLoading, isError } = useQuery<Sport[]>(["sports"], () =>
    fetchAllSports()
  );

  if (isLoading) return <Loader />;

  if (isError) {
    return <h3 className="center">Something went wrong. Please try again</h3>;
  }

  return (
    <>
      <div className="center">
        <h2 style={{ paddingBottom: "40px" }}>Odds</h2>
      </div>
      <List url="odds" sportsList={data} />
    </>
  );
}

Odds.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Odds">{page}</Layout>
    </>
  );
};
