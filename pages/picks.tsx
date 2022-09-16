import React from "react";
import { NextComponentType } from "next";

import Layout from "../components/layout";

export default function Picks() {
  return (
    <div className="center">
      <h2>Picks</h2>
      <p>Record 20 / 33 (60.6%)</p>
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
      <div className="winner">09/11/22 - Baltimore 1H Under 22</div>
      <div className="loser">09/11/22 - Nick Chubb Anytime TD</div>
      <div className="winner">
        09/11/22 - Trey Lance Over 38.5 Rushing Yards
      </div>
      <div className="loser">09/11/22 - Chargers / Raiders - O52</div>
      <div className="winner">
        09/11/22 - Julio Jones - Over 38.5 yards receiving
      </div>
      <div className="winner">
        09/11/22 - Julio Jones - Over 38.5 yards receiving
      </div>
      <div className="winner">
        09/12/22 - Rashad Penny - Under 69.5 yards rushing
      </div>
      <div className="winner">
        09/12/22 - Jerry Jeudy - Over 60.5 yards receiving
      </div>
      <div className="loser">09/12/22 - Denver Broncos - -6.5 receiving</div>
      <div className="loser">09/13/22 - Los Angeles Angels ML +117</div>
      <div className="winner">09/14/22 - Orioles -1.5 RL +134</div>
      <div className="winner">09/14/22 - Seattle Mariners -1.5 RL +152</div>
      <div className="loser">09/14/22 - Tampa Bay Rays -102</div>
      <div className="winner">09/15/22 - Chicago White Sox -1.5 RL +132</div>
      <div className="loser">09/15/22 - Minnesota Twins -1.5 RL +120</div>
      <div className="loser">09/15/22 - Philadelphia Phillies ML -120</div>
      <div className="winner">09/15/22 - Chargers 1st Half +3</div>
      <div className="winner">09/15/22 - Chiefs v Chargers U 54</div>
      <div className="loser">09/15/22 - Travis Kelce - Over 6.5 Receptions</div>
      <div className="loser">09/15/22 - Travis Kelce - Over 79.5 yards</div>
      <div className="winner">
        09/15/22 - Austin Ekeler - Over 37.5 receiving yards
      </div>
      <div className="winner">
        09/15/22 - Mike Williams - Over 69.5 receiving yards
      </div>
      <div>09/16/22 - Air Force -15</div>
      <div>09/16/22 - Air Force / Wyoming O 46</div>
      <div>09/16/22 - Florida State -2.5 </div>
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
