export const fetchOdds = async (key) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/odds/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
  );
  return res.json();
};

export const fetchScores = async (key) => {
  const res = await fetch(
    `https://api.the-odds-api.com/v4/sports/${key}/scores/?daysFrom=1&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return res.json();
};
