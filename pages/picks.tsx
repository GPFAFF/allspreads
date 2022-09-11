import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Record 8 / 13 (61.5%)</p>
      <div className="winner">09/05/22 - Chicago White Sox -117</div>
      <div className="loser">
        09/06/22 - Chicago Cubs / Cincinnati Reds U 8 -115
      </div>
      <div className="loser">
        09/06/22 - Chicago White Sox / Seattle Mariners O 7.5 -115
      </div>
      <div className="winner">09/07/22 - Philadelphia RL F5 -0.5</div>
      <div className="winner">09/08/22 - Gabe Davis - Anytime TD</div>
      <div className="winner">09/08/22 - Gabe Davis - Over 62.5 yards</div>
      <div className="winner">
        09/08/22 - Josh Allen - Over 23.5 completions{" "}
      </div>
      <div className="loser">
        09/08/22 - Cam Akers - Over 13.5 yards receiving{" "}
      </div>
      <div className="loser">09/08/22 - Buffalo Bills / LA Rams O 52</div>
      <div className="winner">09/09/22 - Louisville / UCF U 61.5</div>
      <div className="loser">09/10/22 - Alabama -20 v Texas</div>
      <div className="winner">09/10/22 - USC -8.5 v Stanford</div>
      <div className="winner">09/10/22 - Tennessee -6.5 v Pittsburgh</div>
      <div>09/11/22 - Baltimore 1H Under 22</div>
      <div>09/11/22 - Nick Chubb Anytime TD</div>
      <div>09/11/22 - Trey Lance Over 38.5 Rushing Yards</div>
      <div>09/11/22 - Chargers / Raiders - O52</div>
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
