import React, { useEffect } from "react";
import { dehydrate, QueryClient, useQuery, useHydrate } from "react-query";
import Layout from "../../../components/layout";
import { fetchOdds } from "../../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
// import data from "../upcoming.json";
import Image from "next/image";
import styled from "styled-components";
import { data, getPath, toBase64, shimmer } from "../../../helpers";
import OddsCard from "../../../components/odds-card";
import { isBefore, parseISO } from "date-fns";

const OddsTitle = styled.h2`
  margin-bottom: 20px;
`;

export default function SingleOdds() {
  const router = useRouter();

  const key = getPath(router.query.sport);

  const { data, status, isLoading } = useQuery(
    ["odds", key],
    () => fetchOdds(key),
    {
      refetchOnWindowFocus: false,
    }
  );

  const normalizeOdds =
    !isLoading &&
    data?.filter((item) =>
      isBefore(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z"))
    );

  if (isLoading) return <p>...</p>;
  return (
    <>
      <OddsTitle>{normalizeOdds[0].sport_title} Spreads</OddsTitle>
      <div>
        {normalizeOdds?.map((item) => (
          <OddsCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

// export async function getStaticProps(context) {
//   return {
//     props: {
//       data,
//     },
//   };
// }

// export async function getStaticProps(context) {
//   const queryClient = new QueryClient();
//   const name = getPath(context.params.name);

//   await queryClient.fetchQuery(["odds"], () => fetchOdds(name));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

// export async function getStaticPaths() {
//   const paths = data.map((name) => ({
//     params: { name: name.slug },
//   }));
//   // dont get paths for cms posts, instead, let fallback handle it
//   return { paths, fallback: true };
// }

SingleOdds.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};
