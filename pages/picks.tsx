import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Check back for free selections</p>
    </div>
  );
}

Picks.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
