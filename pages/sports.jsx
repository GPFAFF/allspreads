import React from "react";
import List from "../components/list";
import Layout from "../components/layout";
import { data } from "../helpers/index";

export default function Sports() {
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

Sports.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
