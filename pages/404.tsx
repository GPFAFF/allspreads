import React from "react";
import { NextComponentType } from "next";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <div className="center">
      <h2>404 - Page Not Found</h2>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
