import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import styled from "styled-components";
import { isBefore, addDays } from "date-fns";
import Link from "next/link";
import { NextComponentType } from "next";

import Layout from "../../../components/layout";
import { fetchOdds } from "../../../hooks";
import { getPath } from "../../../helpers";
import OddsCard from "../../../components/odds-card";
import Loader from "../../../components/loader";

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

SingleOdds.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
