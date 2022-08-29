import { NextComponentType } from "next";
import React from "react";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <h2
      style={{
        display: "flex",
        width: "100%",
        marginTop: "50px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      404 - Page Not Found
    </h2>
  );
}

Custom404.getLayout = function getLayout(page: NextComponentType) {
  return <Layout>{page}</Layout>
};
