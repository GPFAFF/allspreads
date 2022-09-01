import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextComponentType } from "next";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

import Layout from "../../../components/layout";
import { useFetchOdds } from "../../../hooks";
import { getPath, getSport } from "../../../helpers";
import OddsCard from "../../../components/odds-card";
import Loader from "../../../components/loader";
import TeamLogo from "../../../components/team-logo";

const OddsTitle = styled.h2`
  display: grid;
  justify-content: center;
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

const SearchBar = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  align-items: center;
`;

const StyledInput = styled(DebounceInput)`
  border-radius: 4px;
  padding: 20px;
  width: 250px;
  align-self: end;
`;

export default function SingleOdds() {
  const router = useRouter();
  const key = getPath(router.query.sport);
  const slug = router.query.sport;

  const [filters, setFilters] = useState("");
  const { data, isLoading, isError } = useFetchOdds(key, filters);

  const onChange = (event) => {
    setFilters(event?.target.value);
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return <h3 className="center">Something went wrong. Please try again</h3>;
  }

  return (
    <>
      <SearchBar>
        <OddsTitle>
          <TeamLogo
            style={{ paddingRight: "8px" }}
            alt={getSport(slug)}
            height={50}
            width={50}
            objectFit="contain"
            team={getSport(slug).toLowerCase()}
            slug={""}
          />
          {getSport(slug)} Spreads
        </OddsTitle>
        <StyledInput
          placeholder="Search by team"
          minLength={2}
          debounceTimeout={300}
          onChange={onChange}
        />
      </SearchBar>
      <div>
        {data.length === 0 ? (
          <Center>
            <NotFound>No odds found</NotFound>
            <Link href={`/sports/${key}`}>Back</Link>
          </Center>
        ) : (
          <>
            {data?.map((item, i) => (
              <OddsCard key={i} item={item} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

SingleOdds.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Odds">{page}</Layout>
    </>
  );
};
