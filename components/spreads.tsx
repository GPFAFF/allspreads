import React from "react";
import { positiveOrNegativeSpread } from "../helpers/index";

type Props = {
  bookmaker: {
    title: string;
  };
  market: {
    key: string;
    outcomes?: [
      {
        point: string;
        price: string | number;
      }
    ];
  };
};

export default function Spreads(props: Props) {
  const { bookmaker, market } = props;
  return (
    <>
      <div key={`${bookmaker.title} - ${market.key}`}>Spreads</div>
      <div>
        {positiveOrNegativeSpread(market.outcomes[0].point)}{" "}
        {positiveOrNegativeSpread(market.outcomes[0].price)}
      </div>
    </>
  );
}
