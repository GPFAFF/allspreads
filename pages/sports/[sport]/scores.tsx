import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { NextComponentType } from "next";
import { DebounceInput } from "react-debounce-input";

import Layout from "../../../components/layout";
import { formatSEOTitle, getPath, getSport } from "../../../helpers";
import ScoresCard from "../../../components/scores-card";
import Loader from "../../../components/loader";
import Image from "next/image";
import { formatName } from "../../../helpers/index";
import { fetchAllSports, useFetchScores } from "../../../hooks/index";
import TeamLogo from "../../../components/team-logo";

const ScoresTitle = styled.h2`
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

const ScoresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-content: center;
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
export default function Scores({ sport }) {
  const key = getPath(sport);
  const slug = sport;

  const [filters, setFilters] = useState("");
  const { data, isLoading, isError } = useFetchScores(key, filters);

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
        <ScoresTitle>
          <TeamLogo
            style={{ paddingRight: "8px" }}
            alt={getSport(sport)}
            height={50}
            width={50}
            objectFit="contain"
            team={getSport(sport).toLowerCase()}
            slug={""}
          />
          {getSport(slug)} Spreads
        </ScoresTitle>
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
            <ScoresContainer>
              {data?.map((item, i) => {
                const sortedScores = item?.scores
                  ? item?.scores.sort((a, b) => b.score - a.score)
                  : [];
                return (
                  <ScoresCard key={item.id} item={item} scores={sortedScores} />
                );
              })}
            </ScoresContainer>
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
Scores.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle(page?.props.title?.query?.sport);

  const formatString =
    title && !undefined ? `${title} | Scores` : "Sport Scores";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
