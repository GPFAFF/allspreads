/* eslint-disable import/prefer-default-export */
const path = require('path');
const fetch = require('isomorphic-fetch');
require('dotenv').config();

// Create pages dynamically
const pages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/Sports.jsx');
  const { data } = await graphql(`
    query {
      sports: allSanitySports {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.sports.nodes.forEach((element) => {
    createPage({
      path: `sports/${element.slug.current}`,
      component: template,
      context: {
        title: element.name,
        slug: element.slug.current,
      },
    });
  });
};

const fantasy = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/Fantasy.jsx');
  const { data } = await graphql(`
    query {
      sports: allSanitySports {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.sports.nodes.forEach((element) => {
    createPage({
      path: `sports/${element.slug.current}/fantasy`,
      component: template,
      context: {
        title: element.name,
        slug: element.slug.current,
      },
    });
  });
};

const odds = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const template = path.resolve('./src/templates/Odds.jsx');
  const { data } = await graphql(`
    query {
      sports: allSanitySports {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.sports.nodes.forEach((element) => {
    createPage({
      path: `sports/${element.slug.current}/odds`,
      component: template,
      context: {
        title: element.name,
        slug: element.slug.current,
      },
    });
  });
};

exports.createPages = async (params) => {
  await Promise.all([
    pages(params),
    odds(params),
    fantasy(params),
  ]);
};

async function fetchOdds({ actions, createNodeId, createContentDigest }) {
  const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&apiKey=${process.env.ODDS_TOKEN}`);
  const oddsResponse = await response.json();
  console.log('Fetching Odds', process.env.ODDS_TOKEN, oddsResponse);
}

exports.sourceNodes = async (params) => {
  // fetch odds
  await Promise.all([
    fetchOdds(params),
  ]);
};
