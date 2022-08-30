import { NextComponentType } from "next";
import React from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import { fetchSportsNews } from "../hooks";
import styled from "styled-components";
import Image from "next/image";
import { hasCdn } from "../helpers/index";
import Link from "next/link";
import Loader from "../components/loader";
export default function HomePage() {
  const { data, isLoading } = useQuery(["news"], () => fetchSportsNews());

  const Card = styled.div`
    gap: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;

    @media (max-width: 620px) {
      grid-template-columns: 1fr;
    }
  `;

  const SingleCard = styled.div`
    display: grid;
    list-style-type: none;
    margin: 10px 0;
    background-color: var(--grey);
    border: 4px solid var(--green);
    border-radius: 8px;
    text-align: center;
    padding: 14px 0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    transform: scale(1);
    transition: 0.5s;

    > h3 {
      text-align: center;
    }

    &:hover {
      cursor: pointer;
    }
  `;

  const filteredArticles = data?.articles.filter((item) =>
    hasCdn(item.source.name.toLowerCase())
  );

  return (
    <>
      <div>
        <h2 className="center">All Spreads. All the time</h2>
        <h3 style={{ padding: "40px 0", textAlign: "center" }}>News Feed</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <Card>
            {filteredArticles?.map((item, i) => (
              <SingleCard key={i}>
                <Link target="_blank" href={item.url}>
                  <h3 style={{ paddingBottom: "40px" }}>{item.title}</h3>
                </Link>
                <Image
                  alt={item.title}
                  src={item.urlToImage}
                  width={350}
                  height={300}
                  objectFit="contain"
                />
              </SingleCard>
            ))}
          </Card>
        )}
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
