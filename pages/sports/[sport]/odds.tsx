import React from "react";
import { useQuery } from "react-query";
import Layout from "../../../components/layout";
import { fetchOdds } from "../../../hooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getPath } from "../../../helpers";
import OddsCard from "../../../components/odds-card";
import { isBefore } from "date-fns";
import Loader from "../../../components/loader";
import Link from "next/link";

const OddsTitle = styled.h2`
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

export default function SingleOdds() {
  const router = useRouter();
  const key = getPath(router.query.sport);

  const { data, isLoading } = useQuery(["odds", key], () => fetchOdds(key), {
    refetchOnWindowFocus: false,
  });

  const normalizeOdds =
    data?.length > 0 &&
    data?.filter((item) =>
      isBefore(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z"))
    );

  if (isLoading) return <Loader />;

  if (data.length === 0)
    return (
      <Center>
        <NotFound>No odds found</NotFound>
        <Link href={`/sports/${key}`}>Back</Link>
      </Center>
    );

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

SingleOdds.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
