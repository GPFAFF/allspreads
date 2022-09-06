import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Record 0 - 0</p>
      <div>09/05/22 - Chicago White Sox -117</div>
    </div>
  );
}

Picks.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Picks">{page}</Layout>
    </>
  );
};
