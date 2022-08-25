import React from "react";
import List from "../components/List";
import Layout from "../components/layout";
import { data } from "../helpers/index";

export default function Odds() {
  return (
    <>
      <List data={data} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data,
    },
  };
}

Odds.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
