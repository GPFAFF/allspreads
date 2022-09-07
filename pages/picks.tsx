import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Record 1 - 2 (33%)</p>
      <div className="winner">09/05/22 - Chicago White Sox -117</div>
      <div className="loser">
        09/06/22 - Chicago Cubs / Cincinnati Reds U 8 -115
      </div>
      <div className="loser">
        09/06/22 - Chicago White Sox / Seattle Mariners O 7.5 -115
      </div>
      <div>09/08/22 - Buffalo Bills / LA Rams O 52</div>
    </div>
  );
}

Picks.getLayout = function getLayout(page: NextComponentType) {
  return (
    <>
      <Layout title="Picks">{page}</Layout>
    </>
  );
};
