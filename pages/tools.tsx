import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function News() {
  return (
    <div className="center">
      <h2>Tools</h2>
      <p>Coming soon</p>
    </div>
  );
}

News.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="News">{page}</Layout>
    </>
  );
};
