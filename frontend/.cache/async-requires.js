// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./../../dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-jsx": () => import("./../../../src/pages/404.jsx" /* webpackChunkName: "component---src-pages-404-jsx" */),
  "component---src-pages-index-jsx": () => import("./../../../src/pages/index.jsx" /* webpackChunkName: "component---src-pages-index-jsx" */),
  "component---src-pages-odds-jsx": () => import("./../../../src/pages/odds.jsx" /* webpackChunkName: "component---src-pages-odds-jsx" */),
  "component---src-pages-picks-jsx": () => import("./../../../src/pages/picks.jsx" /* webpackChunkName: "component---src-pages-picks-jsx" */),
  "component---src-pages-sports-jsx": () => import("./../../../src/pages/sports.jsx" /* webpackChunkName: "component---src-pages-sports-jsx" */)
}

