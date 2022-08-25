import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../../components/layout";
import { fetchOdds } from "../../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { getPath, toBase64, shimmer } from "../../../helpers";
import { server } from "../../../config";

const SportStyles = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  div {
    &:last-of-type {
      display: grid;
      justify-content: center;
    }
  }
`;

export default function SingleSport({ data }) {
  return (
    <>
      <SportStyles>
        <Image
          alt={data?.slug}
          src={data?.src}
          placeholder="blur"
          blurDataURL={`${data?.src},${toBase64(shimmer(700, 475))}`}
          height={300}
          width={300}
          layout="responsive"
        />
        <div>
          <h2>{data?.name}</h2>
          <Link href={`/sports/${data?.slug}/scores`}>
            <h2>Scores</h2>
          </Link>
          <Link href={`/sports/${data?.slug}/odds`}>
            <h2>Odds</h2>
          </Link>
        </div>
      </SportStyles>
    </>
  );
}


export async function getStaticProps(context) {
  const urlPath = context.params.sport;
  const res = await fetch(`${server}/api/sports/${urlPath}`)
  const data = await res.json()

  return {
    props: {
      data
    },
  }
}

export async function getStaticPaths() {
  return { paths: ['/sports/[sport]'], fallback: true };
}

SingleSport.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
};
