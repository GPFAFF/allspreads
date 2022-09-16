import React, { useState, useEffect } from "react";
import { NextComponentType } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import styled from "styled-components";

import Layout from "../components/layout";
import { fetchAllPicks } from "../hooks/index";
import Loader from "../components/loader";

const Row = styled.div`
  padding: 20px;
  background: var(--gray);
  border-radius: 4px;
  border: 8px solid var(--green);
  margin: 20px;
`;
export default function Picks(props) {
  const [winners, setWinners] = useState(0);
  const [losers, setLosers] = useState(0);
  const [rowShown, setRowShown] = useState(false);

  const { data, isLoading, isError } = useQuery<[]>(["picks"], () =>
    fetchAllPicks()
  );

  const formatPercent = (winners: number, losers: number) => {
    return `Record ${winners} / ${losers + winners} - ${Number(
      winners / (losers + winners)
    ).toFixed(3)}%`;
  };

  useEffect(() => {
    const winners = document.querySelectorAll(".winner").length;
    const losers = document.querySelectorAll(".loser").length;

    setWinners(winners);
    setLosers(losers);
  }, []);

  const handleClick = () => {
    setRowShown(!rowShown);
  };

  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Overall {formatPercent(winners, losers)}</p>
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          {data?.map((item: any, i) => {
            const { picks } = item;

            return (
              <>
                <h3 onClick={handleClick}>{item.month}</h3>
                <div className={rowShown ? "show" : "hide"} key={i}>
                  <>
                    <div>
                      {picks.map((pick, i) => (
                        <div key={i} className={pick.result ? pick.result : ""}>
                          {pick.date} - {pick.team} {pick.odds}
                        </div>
                      ))}
                    </div>
                  </>
                </div>
              </>
            );

            // return (
            //   <>
            //     <h3>{item.month}</h3>
            //     <div key={i}>
            //       {picks.map((pick, i) => (
            //         <div key={i} className={pick.result ? pick.result : ""}>
            //           {pick.date} - {pick.team} {pick.odds}
            //         </div>
            //       ))}
            //     </div>
            //   </>
            // );
          })}
        </Row>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("picks", fetchAllPicks);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

Picks.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Picks">{page}</Layout>
    </>
  );
};
