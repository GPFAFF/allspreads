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

export default function Totals(props: Props) {
  const { bookmaker, market } = props;
  return (
    <>
      <div key={`${bookmaker.title} - ${market.key}`}>Totals</div>
      <div>
        O/U {market.outcomes[0].point}{" "}
        {positiveOrNegativeSpread(market.outcomes[0].price)}
      </div>
    </>
  );
}
