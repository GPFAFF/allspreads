import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../../../components/layout";
import { formatSEOTitle, getPath, getSport } from "../../../helpers/index";
import ScoresCard from "../../../components/scores-card";
import Loader from "../../../components/loader";

import { fetchAllSports, useFetchScores } from "../../../hooks/index";
import TeamLogo from "../../../components/team-logo";
import {
  SearchBar,
  StyledInput,
  StyledInputContainer,
} from "../../../styles/components";

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

export default function Scores({ slug }) {
  const key = getPath(slug);

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
            alt={getSport(slug)}
            height={50}
            width={50}
            objectFit="contain"
            team={getSport(slug).toLowerCase()}
            slug={""}
          />
          {getSport(slug)} Spreads
        </ScoresTitle>
        <StyledInputContainer>
          <StyledInput
            placeholder="Search by team"
            minLength={2}
            debounceTimeout={300}
            onChange={onChange}
          />
        </StyledInputContainer>
      </SearchBar>
      <div>
        {data.length === 0 ? (
          <Center>
            <NotFound>No scores found</NotFound>
            <Link href={`/scores`}>Back</Link>
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
      <Layout description={formatString} title={formatString}>
        {page}
      </Layout>
    </>
  );
};
