import { NextComponentType } from "next";
import React from "react";
import Layout from "../components/layout";

export default function Custom404() {
  return <h2>404 - Page Not Found</h2>;
}

Custom404.getLayout = function getLayout(page: NextComponentType) {
  return <Layout>{page}</Layout>
};
