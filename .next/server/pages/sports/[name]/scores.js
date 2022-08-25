"use strict";
(() => {
var exports = {};
exports.id = 471;
exports.ids = [471];
exports.modules = {

/***/ 3396:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ fetchOdds),
/* harmony export */   "F": () => (/* binding */ fetchScores)
/* harmony export */ });
const fetchOdds = async key => {
  const res = await fetch(`https://api.the-odds-api.com/v4/sports/${key}/odds/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`);
  return res.json();
};
const fetchScores = async key => {
  const res = await fetch(`https://api.the-odds-api.com/v4/sports/${key}/scores/?daysFrom=1&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`);
  return res.json();
};

/***/ }),

/***/ 5689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Scores),
  "getStaticPaths": () => (/* binding */ getStaticPaths),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(1175);
// EXTERNAL MODULE: ./components/layout.jsx + 5 modules
var layout = __webpack_require__(4555);
// EXTERNAL MODULE: ./hooks/index.js
var hooks = __webpack_require__(3396);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./helpers/index.js + 9 modules
var helpers = __webpack_require__(6578);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/scores-card.jsx




const ScoreCardStyles = external_styled_components_default().div.withConfig({
  displayName: "scores-card__ScoreCardStyles",
  componentId: "sc-1718rig-0"
})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;list-style-type:none;background-color:var(--green);border-radius:8px;text-align:center;padding:14px 0;box-shadow:rgba(50,50,93,0.25) 0px 6px 12px -2px,rgba(0,0,0,0.3) 0px 3px 7px -3px;transform:scale(1);transition:0.5s;> h3{margin-bottom:20px;}&:hover{transition:0.5s;transform:scale(1.01);}"]);
function ScoresCard({
  item
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(ScoreCardStyles, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h3", {
      children: [item.away_team, " @ ", item.home_team]
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: new Date(item.commence_time).toLocaleDateString()
    }), item.completed ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      children: ["Score: ", item.scores]
    }) : /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "Score: 0 - 0"
    })]
  });
}
// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(4146);
;// CONCATENATED MODULE: ./pages/sports/[name]/scores.jsx





 // import data from "../upcoming.json";









const SportStyles = external_styled_components_default().div.withConfig({
  displayName: "scores__SportStyles",
  componentId: "sc-aains5-0"
})(["display:grid;align-content:center;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;div{&:last-of-type{display:grid;justify-content:center;}}"]);
const ScoresTitle = external_styled_components_default().h2.withConfig({
  displayName: "scores__ScoresTitle",
  componentId: "sc-aains5-1"
})(["margin-bottom:20px;"]);
const ScoresContainer = external_styled_components_default().div.withConfig({
  displayName: "scores__ScoresContainer",
  componentId: "sc-aains5-2"
})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:2rem;"]);
function Scores() {
  const {
    query,
    pathname,
    asPath
  } = (0,router_.useRouter)();
  const key = (0,helpers/* getPath */.DW)(query.name); // const { name, src, slug, odds } = data?.find(
  //   (item) => item.name.toLowerCase() === query.name
  // );
  // console.log("data", key);

  const {
    data,
    status,
    isLoading
  } = (0,external_react_query_.useQuery)(["odds", key], () => (0,hooks/* fetchScores */.F)(key), {
    refetchOnWindowFocus: false
  });
  const normalizeScores = !isLoading && data?.filter(item => (0,external_date_fns_.isBefore)(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z")));
  if (isLoading) return /*#__PURE__*/jsx_runtime_.jsx("p", {
    children: "..."
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(ScoresTitle, {
      children: [normalizeScores[0].sport_title, " Scores"]
    }), /*#__PURE__*/jsx_runtime_.jsx(ScoresContainer, {
      children: normalizeScores?.map(item => /*#__PURE__*/jsx_runtime_.jsx(ScoresCard, {
        item: item
      }, item.id))
    })]
  });
}
async function getStaticProps(context) {
  return {
    props: {
      data: helpers/* data */.aT
    }
  };
} // export async function getStaticProps(context) {
//   const queryClient = new QueryClient();
//   const name = getPath(context.params.name);
//   await queryClient.fetchQuery(["odds"], () => fetchOdds(name));
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

async function getStaticPaths() {
  return {
    paths: [// String variant:
    "/sports/[...name]/scores" // Object variant:
    // { params: { slug: "second-post" } },
    ],
    fallback: true
  };
}

Scores.getLayout = function getLayout(page) {
  return /*#__PURE__*/jsx_runtime_.jsx(layout/* default */.Z, {
    children: page
  });
};

/***/ }),

/***/ 4146:
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 5429:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 1175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7518:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [383,61,555,578], () => (__webpack_exec__(5689)));
module.exports = __webpack_exports__;

})();