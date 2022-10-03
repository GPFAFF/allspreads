const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "https://allspreads.com";

// eslint-disable-next-line import/no-anonymous-default-export
export const SEOData = {
  title: "AllSpreads",
  author: {
    name: "Max Wagers",
    summary: "Put me down for a 1000",
  },
  description: "All Spreads. All the time.",
  social: {
    twitter: "allspreads",
    instagram: "allspreads",
  },
};
