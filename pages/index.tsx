import React, { useState, useEffect } from "react";
import { NextComponentType } from "next";
import Image from "next/image";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

import Layout from "../components/layout";
import { fetchSportsNews } from "../hooks";
import Loader from "../components/loader";

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
export default function HomePage() {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["news"],
    async ({ pageParam = 1 }) => {
      const res = await fetchSportsNews(pageParam);
      return res;
    },
    {
      getNextPageParam: (lastPage, _allPages) => lastPage.nextPage,
      getPreviousPageParam: (firstPage, _allPages) => firstPage.nextPage,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div>
        <h2 className="center">All Spreads. All the time</h2>
        <h3 style={{ padding: "40px 0", textAlign: "center" }}>Latest Feed</h3>

        {isError && !isLoading && (
          <h3 className="center">Something went wrong. Please try again</h3>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.pages.map((page, i) => (
              <Card key={i}>
                {page?.results?.map(
                  (
                    item: {
                      link: string;
                      title: string;
                      image_url: string;
                    },
                    i: React.Key
                  ) => {
                    const useImageFallback =
                      imageError || null || !item?.image_url;
                    return (
                      <SingleCard key={i}>
                        <a target="_blank" href={item.link} rel="noreferrer">
                          <h3 style={{ padding: "20px" }}>{item.title}</h3>
                        </a>
                        {item && (
                          <Image
                            alt={item?.title}
                            onError={() => setImageError(true)}
                            src={
                              useImageFallback ? "/logo.svg" : item?.image_url
                            }
                            width={350}
                            height={300}
                            objectFit="contain"
                          />
                        )}
                      </SingleCard>
                    );
                  }
                )}
              </Card>
            ))}
          </>
        )}
        <div className="center" ref={ref}>
          {inView && <Loader />}
        </div>
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout
        description="AllSpreads shows a comparison amongst the largest books in the US and Offshore"
        title="AllSpreads shows a comparison amongst the largest books in the US and Offshore"
      >
        {page}
      </Layout>
    </>
  );
};
