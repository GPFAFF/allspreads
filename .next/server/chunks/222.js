"use strict";
exports.id = 222;
exports.ids = [222];
exports.modules = {

/***/ 9222:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ List)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./helpers/index.js + 1 modules
var helpers = __webpack_require__(71);
;// CONCATENATED MODULE: ./components/card.jsx






const CardStyles = (external_styled_components_default()).div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span;
  gap: 1em;
  h2 {
    margin: 0;
  }
`;
function Card({ item  }) {
    const { name , src , slug  } = item;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(CardStyles, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: name
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: `/sports/${slug}`,
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: src
                })
            })
        ]
    });
};

;// CONCATENATED MODULE: ./components/list.jsx




const ListStyles = (external_styled_components_default()).div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto;
`;
function List({ data  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(ListStyles, {
        children: data.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(Card, {
                item: item
            }, item.id))
    });
};


/***/ })

};
;