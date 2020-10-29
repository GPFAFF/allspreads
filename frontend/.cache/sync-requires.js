const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/.cache/dev-404-page.js"))),
  "component---src-pages-404-jsx": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/src/pages/404.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/src/pages/index.jsx"))),
  "component---src-pages-odds-jsx": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/src/pages/odds.jsx"))),
  "component---src-pages-picks-jsx": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/src/pages/picks.jsx"))),
  "component---src-pages-sports-jsx": hot(preferDefault(require("/Users/gregpfaff/Desktop/dev/allspreads/frontend/src/pages/sports.jsx")))
}

