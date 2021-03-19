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
          slug {
            current
          }
        }
      }
      odds: allOdds {
        nodes {
          id
        }
      }
    }
  `);

  data.odds.nodes.forEach((element) => {
    createPage({
      path: `odds/current-odds/${element.id}`,
      component: template,
      context: {
        title: element.name,
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
    fantasy(params),
    odds(params),
    singleOdds(params),
  ]);
};

async function fetchUpcomingOdds({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=spreads&apiKey=${process.env.ODDS_TOKEN}`);
  // const oddsResponse = await response.json();

  // console.log(oddsResponse);
  //  const copiedResponse = [...oddsResponse];

  // const { data } = oddsResponse;
  const { data } = testData;

  for (const item of data) {
    const nodeMeta = {
      id: createNodeId(`odds-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Odds',
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    };

    actions.createNode({
      ...item,
      ...nodeMeta,
    });
  }
}

// async function fetchSportSpecificOdds({
//   actions,
//   createNodeId,
//   createContentDigest,
// }) {


//   sportNames.forEach(name => {

//   })
//   const { data } = await client.query({
//     query: gql`
//       query {
//         sports: allSanitySports {
//           nodes {
//             name
//             slug {
//               current
//             }
//           }
//         }
//       }
//     `,
//   });

// console.log('THE DATA', data);


// const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&apiKey=${process.env.ODDS_TOKEN}`);
// const oddsResponse = await response.json();

// console.log(oddsResponse);
//  const copiedResponse = [...oddsResponse];

// const { data } = testData;

// for (const item of data) {
//   const nodeMeta = {
//     id: createNodeId(`odds-${item.id}`),
//     parent: null,
//     children: [],
//     internal: {
//       type: 'Odds',
//       content: JSON.stringify(item),
//       contentDigest: createContentDigest(item),
//     },
//  };

// actions.createNode({
//   ...item,
//   ...nodeMeta,
// });
// }
// }

exports.sourceNodes = async (params) => {
  // fetch odds
  await Promise.all([
    fetchUpcomingOdds(params),
    // fetchSportSpecificOdds(params),
  ]);
};
