import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Record 2 - 2 (50%)</p>
      <div className="winner">09/05/22 - Chicago White Sox -117</div>
      <div className="loser">
        09/06/22 - Chicago Cubs / Cincinnati Reds U 8 -115
      </div>
      <div className="loser">
        09/06/22 - Chicago White Sox / Seattle Mariners O 7.5 -115
      </div>
      <div className="winner">09/07/22 - Philadelphia RL F5 -0.5</div>
      <div>09/08/22 - Gabe Davis Anytime TD</div>
      <div>09/08/22 - Gabe Davis Over 62.5 yards</div>
      <div>09/08/22 - Josh Allen over 23.5 completions </div>
      <div>09/08/22 - Cam Akers 13.5 yards receiving </div>
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
