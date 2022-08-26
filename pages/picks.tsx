import { NextComponentType } from "next";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import { fetchOdds } from "../hooks";

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
  return <Layout>{page}</Layout>
};
