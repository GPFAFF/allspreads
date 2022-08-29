import { NextComponentType } from "next";
import React from "react";
import Layout from "../components/layout";

export default function HomePage() {
  return (
    <>
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
        <h2>All Spreads. All the time</h2>
        <p>News feed coming soon.</p>
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: NextComponentType) {
  return <Layout>{page}</Layout>
};
