const dotenv = require('dotenv');

dotenv.config({ path: 'env' });

module.exports = {
  siteMetadata: {
    title: 'AllSpreads',
    siteUrl: 'https://allspreads.com',
    description: 'The best site for online odds',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'qlsglwyt',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
