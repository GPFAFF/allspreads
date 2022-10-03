import React from "react";

type Props = {
  bookmaker: {
    title: string;
  };
  market: {
    key: string;
    outcomes?: [
      {
        price: string | number;
      }
    ];
  };
};

export default function H2H(props: Props) {
  const { bookmaker, market } = props;
  return (
    <>
      <span key={bookmaker.title}>
        {""}
        {Number(market.outcomes[0].price) > 0
          ? `+${market.outcomes[0].price}`
          : `${market.outcomes[0].price}`}
      </span>
    </>
  );
}
