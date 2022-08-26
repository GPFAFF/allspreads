import React, { useEffect } from "react";
import { dehydrate, QueryClient, useQuery, useHydrate } from "react-query";
import Layout from "../../../components/layout";
import { fetchOdds } from "../../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { getPath, toBase64, shimmer } from "../../../helpers";
import OddsCard from "../../../components/odds-card";
import { isBefore, parseISO } from "date-fns";
import Loader from "../../../components/loader";

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

  if (isLoading) return <Loader />;

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
  return <Layout>{page}</Layout>
};
