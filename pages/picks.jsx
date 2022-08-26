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

Picks.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};

// pages/posts.jsx
// import { dehydrate, QueryClient, useQuery } from "react-query";

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery("odds", fetchOdds);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }
