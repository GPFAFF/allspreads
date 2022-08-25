import React from "react";
import List from "../components/list";
import Layout from "../components/layout";
import { server } from "../config";
export default function Sports({ data }) {

  return (
    <>
      <List data={data} />
    </>
  );
}

export async function getStaticProps(context) {

  const res = await fetch(`${server}/api/sports`)
  const data = await res.json()

  return {
    props: {
      data
    },
  }
}

Sports.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};
