import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../../components/layout";
import { fetchOdds } from "../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
// import data from "../upcoming.json";
import Image from "next/image";
import styled from "styled-components";
import { data, getPath, toBase64, shimmer } from "../../helpers";

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

export default function SingleSport({ urlPath }) {
  const { slug, src, name } = data.find(
    (item) => item.name.toLowerCase() === urlPath[0]
  );

  return (
    <>
      <SportStyles>
        <Image
          style={{
            objectFit: "cover",
          }}
          alt={name}
          src={src}
          placeholder="blur"
          blurDataURL={`${src},${toBase64(shimmer(700, 475))}`}
          height={300}
          width={300}
        />
        <div>
          <h2>{name}</h2>
          <Link href={`/sports/${slug}/scores`}>
            <h2>Scores</h2>
          </Link>
          <Link href={`/sports/${slug}/odds`}>
            <h2>Odds</h2>
          </Link>
        </div>
      </SportStyles>
    </>
  );
}

export async function getStaticProps(context) {
  const urlPath = context.params.name;
  return {
    props: {
      urlPath,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      // String variant:
      "/sports/[...name]",
      // Object variant:
      // { params: { slug: "second-post" } },
    ],
    fallback: true,
  };
}

SingleSport.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
