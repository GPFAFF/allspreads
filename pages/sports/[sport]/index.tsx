import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import Layout from "../../../components/layout";
import { fetchSingleSport } from "../../../hooks";
import { toBase64, shimmer, formatSEOTitle } from "../../../helpers";
import Loader from "../../../components/loader";

const SportStyles = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  div {
    &:last-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      @media (max-width: 480px) {
        display: block;
      }
    }
  }
`;

const StyledLink = styled.h2`
  display: flex;
  height: 30px;
  width: 200px;
  background-color: var(--green);
  color: var(--white);
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 4px;
  transition: 0.5s;
  transform: scale(1);

  @media (max-width: 480px) {
    margin: 20px auto;
    width: 100%;
    box-sizing: border-box;
  }

  &:hover {
    filter: brightness(0.9);
    cursor: pointer;
    transition: 0.5s;
    transform: scale(1.01);
  }
`;

const CardNav = styled.span`
  display: block;

  > h2 {
    margin-bottom: 20px;
  }
`;

export default function SingleSport({ sport }) {
  const { data, isLoading, isError } = useQuery(["singleSport"], () =>
    fetchSingleSport(sport)
  );

  const [imageError, setImageError] = useState(false);

  if (isLoading) return <Loader />;

  if (isError) {
    return <h3 className="center">Something went wrong. Please try again</h3>;
  }

  return (
    <>
      <SportStyles>
        <Image
          objectFit="cover"
          alt={data?.slug}
          onError={() => setImageError(true)}
          src={imageError ? "/logo.svg" : data?.src}
          placeholder="blur"
          blurDataURL={`${data?.src},${toBase64(shimmer(700, 475))}`}
          height={300}
          width={300}
          layout="responsive"
        />
        {data.slug === "golf" ? (
          <div>
            <CardNav>
              <h2>{data?.name}</h2>
              <Link href="/sports">Back</Link>
            </CardNav>
            <Link href={`/sports/golf_masters_tournament_winner/odds`}>
              <StyledLink>Masters</StyledLink>
            </Link>
            <Link href={`/sports/golf_pga_championship_winner/odds`}>
              <StyledLink>PGA</StyledLink>
            </Link>
            <Link href={`/sports/golf_us_open_winner/odds`}>
              <StyledLink>US Open</StyledLink>
            </Link>
            <Link href={`/sports/golf_the_open_championship_winner/odds`}>
              <StyledLink>The Open</StyledLink>
            </Link>
          </div>
        ) : (
          <div>
            <CardNav>
              <h2>{data?.name}</h2>
              <Link href="/sports">Back</Link>
            </CardNav>
            <Link href={`/sports/${data?.slug}/scores`}>
              <StyledLink>Scores</StyledLink>
            </Link>
            <Link href={`/sports/${data?.slug}/odds`}>
              <StyledLink>Odds</StyledLink>
            </Link>
          </div>
        )}
      </SportStyles>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { sport } = ctx.query;
  return {
    props: {
      sport,
    },
  };
}

SingleSport.getLayout = function getLayout(page: any) {
  const title = formatSEOTitle(page?.props.title?.query?.sport);
  const formatString = title ? `${title}` : "Sport";

  return (
    <>
      <Layout title={formatString}>{page}</Layout>
    </>
  );
};
