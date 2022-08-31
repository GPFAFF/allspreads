import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { NextComponentType } from "next";
import { DebounceInput } from "react-debounce-input";

import Layout from "../../../components/layout";
import { getPath, getSport } from "../../../helpers";
import ScoresCard from "../../../components/scores-card";
import Loader from "../../../components/loader";
import Image from "next/image";
import { formatName } from "../../../helpers/index";
import { useFetchScores } from "../../../hooks/index";
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

const StyledInput = styled(DebounceInput)`
  border-radius: 4px;
  padding: 20px;
  width: 250px;
  align-self: end;
`;

const SearchBar = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  align-items: center;
`;

export default function Scores() {
  const router = useRouter();
  const key = getPath(router.query.sport);
  const slug = router.query.sport;

  const [filters, setFilters] = useState({});
  const { data, isLoading } = useFetchScores(key, filters);

  const onChange = (event) => {
    setFilters(event?.target.value);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <SearchBar>
        <ScoresTitle>
          <TeamLogo
            style={{ paddingRight: "8px" }}
            alt={getSport(router.query.sport)}
            height={50}
            width={50}
            objectFit="contain"
            team={router.query.sport.toString()}
            slug={""}
          />
          {getSport(router.query.sport)} Spreads
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
                  ? item?.scores.sort((a, b) => a.score - b.score)
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

Scores.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
