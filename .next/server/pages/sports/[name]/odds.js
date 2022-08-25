"use strict";
(() => {
var exports = {};
exports.id = 989;
exports.ids = [989];
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

/***/ 8881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SingleOdds),
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
;// CONCATENATED MODULE: ./components/odds-card.jsx








const Odds = external_styled_components_default().div.withConfig({
  displayName: "odds-card__Odds",
  componentId: "sc-19b2e9s-0"
})(["margin-bottom:20px;"]);
const OddsContainer = external_styled_components_default().div.withConfig({
  displayName: "odds-card__OddsContainer",
  componentId: "sc-19b2e9s-1"
})(["display:grid;grid-template-rows:repeat(auto-fit,minmax(60px,1fr));width:100%;"]);
const OddsCardStyles = external_styled_components_default().ul.withConfig({
  displayName: "odds-card__OddsCardStyles",
  componentId: "sc-19b2e9s-2"
})(["display:grid;list-style-type:none;background-color:var(--green);border-radius:8px;text-align:center;padding:14px 0;box-shadow:rgba(50,50,93,0.25) 0px 6px 12px -2px,rgba(0,0,0,0.3) 0px 3px 7px -3px;transform:scale(1);transition:0.5s;> h3{margin-bottom:20px;}&:hover{transition:0.5s;transform:scale(1.01);}"]);
const BookmakersStyles = external_styled_components_default().div.withConfig({
  displayName: "odds-card__BookmakersStyles",
  componentId: "sc-19b2e9s-3"
})(["display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;overflow-x:scroll;"]);
const OddsGrid = external_styled_components_default().div.withConfig({
  displayName: "odds-card__OddsGrid",
  componentId: "sc-19b2e9s-4"
})(["display:grid;gap:12px;"]);
function OddsCard({
  item
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h2", {
      children: [item.away_team, " @ ", item.home_team]
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: new Date(item.commence_time).toLocaleDateString()
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(OddsContainer, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        children: [item.away_team, /*#__PURE__*/jsx_runtime_.jsx(BookmakersStyles, {
          children: item.bookmakers.map(bookmaker => {
            return /*#__PURE__*/jsx_runtime_.jsx(OddsCardStyles, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
                  children: bookmaker.title
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(OddsGrid, {
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                    children: ["H2H", " ", bookmaker.markets.map(market => {
                      if (market.key === "h2h") return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
                          children: ["", Number(market.outcomes[0].price) > 0 ? `+${market.outcomes[0].price}` : `${market.outcomes[0].price}`]
                        })
                      });
                    })]
                  }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                    children: bookmaker.markets.map(market => {
                      if (market.key === "spreads") {
                        return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                          children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
                            children: "Spreads"
                          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                            children: [(0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].point), " ", (0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].price)]
                          })]
                        });
                      }
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                    children: bookmaker.markets.map(market => {
                      if (market.key === "totals") return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
                          children: "Totals"
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                          children: ["O/U ", market.outcomes[0].point, " ", (0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].price)]
                        })]
                      });
                    })
                  })]
                })]
              })
            });
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        children: [item.home_team, /*#__PURE__*/jsx_runtime_.jsx(BookmakersStyles, {
          children: item.bookmakers.map(bookmaker => {
            return /*#__PURE__*/jsx_runtime_.jsx(OddsCardStyles, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
                  children: bookmaker.title
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(OddsGrid, {
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                    children: ["H2H", " ", bookmaker.markets.map(market => {
                      if (market.key === "h2h") return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
                          children: ["", Number(market.outcomes[0].price) > 0 ? `+${market.outcomes[0].price}` : `${market.outcomes[0].price}`]
                        })
                      });
                    })]
                  }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                    children: bookmaker.markets.map(market => {
                      if (market.key === "spreads") {
                        return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                          children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
                            children: "Spreads"
                          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                            children: [(0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].point), " ", (0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].price)]
                          })]
                        });
                      }
                    })
                  }), /*#__PURE__*/jsx_runtime_.jsx("li", {
                    children: bookmaker.markets.map(market => {
                      if (market.key === "totals") return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [/*#__PURE__*/jsx_runtime_.jsx("li", {
                          children: "Totals"
                        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
                          children: ["O/U ", market.outcomes[0].point, " ", (0,helpers/* positiveOrNegativeSpread */.fz)(market.outcomes[0].price)]
                        })]
                      });
                    })
                  })]
                })]
              })
            });
          })
        })]
      })]
    })]
  });
}
// EXTERNAL MODULE: external "date-fns"
var external_date_fns_ = __webpack_require__(4146);
;// CONCATENATED MODULE: ./pages/sports/[name]/odds.jsx





 // import data from "../upcoming.json";









const OddsTitle = external_styled_components_default().h2.withConfig({
  displayName: "odds__OddsTitle",
  componentId: "sc-1qib3b2-0"
})(["margin-bottom:20px;"]);
function SingleOdds() {
  const {
    query,
    pathname,
    asPath
  } = (0,router_.useRouter)();
  const key = (0,helpers/* getPath */.DW)(query.name);
  console.log("data", key);
  const {
    data,
    status,
    isLoading
  } = (0,external_react_query_.useQuery)(["odds", key], () => (0,hooks/* fetchOdds */.D)(key), {
    refetchOnWindowFocus: false
  });
  const normalizeOdds = !isLoading && data?.filter(item => (0,external_date_fns_.isBefore)(new Date(item.commence_time), new Date("2022-09-14T00:30:00Z")));
  if (isLoading) return /*#__PURE__*/jsx_runtime_.jsx("p", {
    children: "..."
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(OddsTitle, {
      children: [normalizeOdds[0].sport_title, " Spreads"]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      children: normalizeOdds?.map(item => /*#__PURE__*/jsx_runtime_.jsx(OddsCard, {
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
    paths: ["/sports/[...name]/odds"],
    fallback: true
  };
}

SingleOdds.getLayout = function getLayout(page) {
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
var __webpack_exports__ = __webpack_require__.X(0, [383,61,555,578], () => (__webpack_exec__(8881)));
module.exports = __webpack_exports__;

})();