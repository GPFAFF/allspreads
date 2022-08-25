import React, { useEffect } from "react";
import { dehydrate, QueryClient, useQuery, useHydrate } from "react-query";
import Layout from "../../../components/layout";
import { fetchOdds, fetchScores } from "../../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
// import data from "../upcoming.json";
import Image from "next/image";
import styled from "styled-components";
import { data, getPath, toBase64, shimmer } from "../../../helpers";
import ScoresCard from "../../../components/scores-card";
import { isBefore, parseISO } from "date-fns";

const SportStyles = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  div {
    &:last-of-type {
      display: grid;
      justify-content: center;
    }
  }
`;

const ScoresTitle = styled.h2`
  margin-bottom: 20px;
`;

const ScoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

export default function Scores() {
  const router = useRouter();

  const key = getPath(router.query.sport);
  // const { name, src, slug, odds } = data?.find(
  //   (item) => item.name.toLowerCase() === query.name
  // );

  // console.log("data", key);
  const { data, status, isLoading } = useQuery(
    ["odds", key],
    () => fetchScores(key),
    {
      refetchOnWindowFocus: false,
    }
  );

  const normalizeScores =
    !isLoading &&
    data?.filter((item) =>
      isBefore(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z"))
    );

  if (isLoading) return <p>...</p>;

  return (
    <>
      <ScoresTitle>{normalizeScores[0].sport_title} Scores</ScoresTitle>
      <ScoresContainer>
        {normalizeScores?.map((item) => (
          <ScoresCard key={item.id} item={item} />
        ))}
      </ScoresContainer>
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

Scores.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
