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
  grid-column-start: 2;
`;

const Tab = styled.button<{ active: boolean }>`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: var(--green);
  border: 0;
  outline: 0;
  flex: 1;
  border-radius: 4px;
  margin: 0 4px;

  ${({ active }) =>
    active &&
    `
    flex: 1;
    border: 2px solid black;
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

export default function SingleOdds({ slug }) {
  const key = getPath(slug);

  const tabs = ["spreads", "h2h", "totals"];
  const [filters, setFilters] = useState("");
  const [active, setActive] = useState(tabs[0]);
  const { data, isLoading, isError, isFetching } = useFetchOdds(
    key,
    active,
    filters
  );

  const onChange = (event) => {
    setFilters(event?.target.value);
  };

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h3 className="center">Something went wrong. Please try again</h3>;
  }

  const formattedType = (type) => {
    return type === "h2h"
      ? "MONEYLINE"
      : type === "totals"
      ? "TOTALS"
      : "SPREADS";
  };

  return (
    <>
      <SearchBar>
        <OddsTitle>
          <TeamLogo
            alt={getSport(slug)}
            height={50}
            width={50}
            objectFit="contain"
            team={getSport(slug)?.toLowerCase()}
            slug={""}
          />
          {getSport(slug)} {formattedType(active)}
        </OddsTitle>
        <ButtonGroup>
          {tabs.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => setActive(type)}
            >
              {formattedType(type)}
            </Tab>
          ))}
        </ButtonGroup>
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
              <OddsCard active={formattedType(active)} key={i} item={item} />
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
  const formatString = title && !undefined ? `${title} | Odds` : "Odds";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
