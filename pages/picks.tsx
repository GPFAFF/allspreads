import { NextComponentType } from "next";
import React from "react";
import Layout from "../components/layout";

export default function Picks() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        marginTop: "50px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
