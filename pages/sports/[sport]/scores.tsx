import React from "react";
import { useQuery } from "react-query";
import Layout from "../../../components/layout";
import { fetchScores } from "../../../hooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getPath } from "../../../helpers";
import ScoresCard from "../../../components/scores-card";
import { isBefore } from "date-fns";
import Loader from "../../../components/loader";
import Link from "next/link";

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
    data?.filter((item) =>
      isBefore(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z"))
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
        {normalizeScores?.map((item) => (
          <ScoresCard key={item.id} item={item} />
        ))}
      </ScoresContainer>
    </>
  );
}

Scores.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
