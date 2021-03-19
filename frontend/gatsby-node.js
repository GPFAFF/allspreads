/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
const path = require('path');
const fetch = require('isomorphic-fetch');
const testData = require('./data.json');
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
const singleOdds = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const template = path.resolve('./src/pages/single-odds.jsx');
  const { data } = await graphql(`
    query {
      sports: allSanitySports {
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.sports.nodes.forEach((element) => {
    createPage({
      path: `sports/${element.slug.current}/odds/current-odds${element.id}`,
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

// async function pagination({ graphql, actions}) {
//   // 1. Query Data
//   const { data } = await graphql(``
//     query {
//       allSanitySports {

//       }
//     }
//   )
// 2. Turns odds into their own page
// 3. Figure out pages and how many per page
// 4. Loop from 1 to n pages.
// }

exports.createPages = async (params) => {
  await Promise.all([
    pages(params),
    odds(params),
    fantasy(params),
    singleOdds(params),
  ]);
};

async function fetchOdds({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&apiKey=${process.env.ODDS_TOKEN}`);
  // const oddsResponse = await response.json();
  // const copiedResponse = [...oddsResponse];
  const copiedResponse = [testData];

  for (const item of copiedResponse) {
    const nodeMeta = {
      id: createNodeId(`odds-${item.sport_nice}`),
      parent: null,
      children: [],
      internal: {
        type: 'Odds',
        mediaType: 'application/json',
        contentDigest: createContentDigest(item),
      },
    };

    actions.createNode({
      ...item,
      ...nodeMeta,
    });
  }
};
// async function fetchOdds({
//   actions,
//   createNodeId,
//   createContentDigest,
//   graphql,
// }) {
//   const { data } = await graphql(`
//     query {
//       sports: allSanitySports {
//         nodes {
//           name
//           slug {
//             current
//           }
//         }
//       }
//     }
//   `);
//   console.log(data);
//   // const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&apiKey=${process.env.ODDS_TOKEN}`);
//   // const oddsResponse = await response.json();
//   // const copiedResponse = [...oddsResponse];
//   const copiedResponse = [testData];

//   for (const item of copiedResponse) {
//     const nodeMeta = {
//       id: createNodeId(`odds-${item.sport_nice}`),
//       parent: null,
//       children: [],
//       internal: {
//         type: 'Odds',
//         mediaType: 'application/json',
//         contentDigest: createContentDigest(item),
//       },
//     };

//     actions.createNode({
//       ...item,
//       ...nodeMeta,
//     });
//   }
// }

exports.sourceNodes = async (params) => {
  // fetch odds
  await Promise.all([
    fetchOdds(params),
  ]);
};
