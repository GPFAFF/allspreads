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

async function createOdds({ graphql, actions }) {
  // 1. Query all odds
  const { data } = await graphql(`
   query {
     allSanitySports {
        nodes {
          name
          slug {
            current
          }
        }
      }
      allOdds {
        nodes {
          commence_time
          home_team
          id
          sites {
            odds {
              spreads {
                points
              }
            }
            last_update
            site_nice
          }
          sites_count
          sport_nice
          sport_key
          teams
        }
        totalCount
      }
    }
  `);
  // TODO: 2. Turn each slicemaster into their own page (TODO)
  // data.allSanitySports.nodes.forEach((sports) => {
  //   actions.createPage({
  //     component: path.resolve('./src/pages/single-odds.jsx'),
  //     path: `/odds/${sports.slug.current}`,
  //     context: {
  //       name: sports.name,
  //       slug: sports.slug.current,
  //     },
  //   });
  // });

  const pageSize = Number(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.allOdds.totalCount / pageSize);
  console.log(
    `There are ${data.allOdds.totalCount} total odds.
    And we have ${pageCount} pages with ${pageSize} per page`,
  );
  // 4. Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/odds/${i + 1}`,
      component: path.resolve('./src/pages/odds.jsx'),
      // This data is pass to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

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
    createOdds(params),
  ]);
};

async function fetchUpcomingOdds({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=spreads&apiKey=${process.env.ODDS_TOKEN}`);
  // const oddsResponse = await response.json();

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

async function fetchBasketballOdds({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // const response = await fetch(`https://api.the-odds-api.com/v3/odds/?sport=basketball_ncaab&region=us&mkt=spreads&apiKey=${process.env.ODDS_TOKEN}`);
  // const oddsResponse = await response.json();

  // const { data } = oddsResponse;
  const { data } = testData;

  for (const item of data) {
    const nodeMeta = {
      id: createNodeId(`odds-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'SingleOdds',
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

exports.sourceNodes = async (params) => {
  // fetch odds
  await Promise.all([
    fetchUpcomingOdds(params),
    fetchBasketballOdds(params),
    // fetchSportSpecificOdds(params),
  ]);
};
