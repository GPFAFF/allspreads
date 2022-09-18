import React, { useState } from "react";
import Link from "next/link";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

import Layout from "../../../components/layout";
import { fetchAllSports, useFetchOdds } from "../../../hooks";
import { formatSEOTitle, getPath, getSport } from "../../../helpers";
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
  margin-bottom: 40px;
  align-items: center;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StyledInput = styled(DebounceInput)`
  border-radius: 4px;
  padding: 20px;
  width: auto;
  margin-top: 20px;
  align-self: end;
`;

export default function SingleOdds({ slug }) {
  const key = getPath(slug);

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
            team={getSport(slug)?.toLowerCase()}
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

export async function getStaticPaths() {
  const sports = await fetchAllSports();

  const paths = sports.map((sport) => ({
    params: { sport: sport.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(ctx) {
  const { sport } = ctx.params;

  return {
    props: {
      slug: sport,
    },
  };
}

SingleOdds.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle(page?.props.title?.query?.sport);
  const formatString = title && !undefined ? `${title} Odds` : "Odds";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
