import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import { fetchOdds } from "../hooks";
// import data from "../upcoming.json";

export default function HomePage() {
  // const { data, status } = useQuery("odds", () => fetchOdds("upcoming"));
  // console.log("data", data);
  // console.log("status", status);

  const status = "success";

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
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page) {
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
