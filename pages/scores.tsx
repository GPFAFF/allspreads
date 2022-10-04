import React from "react";
import { NextComponentType } from "next";

import List from "../components/list";
import Layout from "../components/layout";
import { fetchAllSports } from "../hooks/index";

export default function Sports({ data }) {
  return (
    <>
      <div className="center">
        <h2 style={{ paddingBottom: "40px" }}>Scores</h2>
      </div>
      <List url="scores" sportsList={data} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetchAllSports();

  if (!res) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: res,
    },
  };
}

Sports.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout description="Scores" title="Scores">
        {page}
      </Layout>
    </>
  );
};
