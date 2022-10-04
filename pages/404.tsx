import React from "react";
import { NextComponentType } from "next";
import Layout from "../components/layout";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="center">
      <h2>404 - Page Not Found</h2>
      <Link href="/">Home</Link>
    </div>
  );
}

Custom404.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout description="404 Page" title="404 Page">
        {page}
      </Layout>
    </>
  );
};
