import React from "react";
import { useQuery } from "react-query";
import { isBefore, addDays } from "date-fns";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../../../components/layout";
import { fetchScores } from "../../../hooks";
import { getPath } from "../../../helpers";
import ScoresCard from "../../../components/scores-card";
import Loader from "../../../components/loader";
import { NextComponentType } from "next";

const ScoresTitle = styled.h2`
  margin-bottom: 20px;
`;

const NotFound = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Center = styled.div`
  text-align: center;

  > a {
    padding-top: 20px;
  }
`;

const ScoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
`;

export default function Scores() {
  const router = useRouter();

  const key = getPath(router.query.sport);
  const { data, isLoading } = useQuery(
    ["scores", key],
    () => fetchScores(key),
    {
      refetchOnWindowFocus: false,
    }
  );

  const normalizeScores =
    !isLoading &&
    data?.filter((item: { commence_time: string | number | Date }) =>
      isBefore(
        new Date(item.commence_time),
        addDays(new Date(data[0]?.commence_time), 6)
      )
    );

  if (isLoading) return <Loader />;

  if (data.length === 0)
    return (
      <Center>
        <NotFound>No scores found</NotFound>
        <Link href={`/sports/${key}`}>Back</Link>
      </Center>
    );

  return (
    <>
      <ScoresTitle>{normalizeScores[0].sport_title} Scores</ScoresTitle>
      <ScoresContainer>
        {normalizeScores?.map((item) => {
          const sortedScores = item?.scores
            ? item?.scores.sort((a, b) => a.score - b.score)
            : [];
          return <ScoresCard key={item.id} item={item} scores={sortedScores} />;
        })}
      </ScoresContainer>
    </>
  );
}

Scores.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
