// next.config.js
module.exports = {
  images: {
    domains: [
      "static01.nyt.com",
      "cdn.vox-cdn.com",
      "a.espncdn.com",
      "a1.espncdn.com",
      "a2.espncdn.com",
      "a3.espncdn.com",
      "a4.espncdn.com",
      "www.bleachernation.com",
      "profootballtalk.nbcsports.com",
      "static.www.nfl.com",
      "www.si.com",
      "www.elevenwarriors.com",
      "www.nbcsports.com",
      "soccer.nbcsports.com",
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
};
