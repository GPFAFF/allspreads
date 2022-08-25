"use strict";
exports.id = 649;
exports.ids = [649];
exports.modules = {

/***/ 1649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(7518);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/logo.jsx




const LogoStyles = external_styled_components_default().div.withConfig({
  displayName: "logo__LogoStyles",
  componentId: "sc-1spyiji-0"
})(["font-size:clamp(1px,0.65vw,8px);background-size:150em;transform:translateY(-25%);"]);
function Logo() {
  return /*#__PURE__*/jsx_runtime_.jsx(LogoStyles, {
    children: /*#__PURE__*/jsx_runtime_.jsx((image_default()), {
      src: "/logo.svg",
      alt: "All Spreads",
      width: 150,
      height: 150
    })
  });
}
;// CONCATENATED MODULE: ./components/nav.jsx






const NavStyles = external_styled_components_default().nav.withConfig({
  displayName: "nav__NavStyles",
  componentId: "sc-1y92j7l-0"
})(["background:var(--green);margin-bottom:3rem;ul{display:grid;grid-template-columns:1fr 1fr auto 1fr 1fr;list-style:none;margin:0;padding:0;text-align:center;align-items:center;gap:2rem;}li{color:white;order:1;}.logo{transform:translateY(-25%);}a{font-size:3rem;text-decoration:none;color:var(--white);&:hover{color:var(--grey);}&[aria-current=\"page\"]{color:var(--black);}}"]);
function Nav() {
  return /*#__PURE__*/jsx_runtime_.jsx(NavStyles, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        children: [" ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/",
          children: "Home"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        children: [" ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/sports",
          children: "Sports"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx(Logo, {})
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        children: [" ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/odds",
          children: "Odds"
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
        children: [" ", /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/picks",
          children: "Picks"
        })]
      })]
    })
  });
}
;// CONCATENATED MODULE: ./components/header.jsx



const HeaderStyles = external_styled_components_default().h1.withConfig({
  displayName: "header__HeaderStyles",
  componentId: "sc-qgadj1-0"
})(["text-align:center;margin-bottom:3rem;"]);
function Header() {
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: /*#__PURE__*/jsx_runtime_.jsx(HeaderStyles, {
      children: "AllSpreads"
    })
  });
}
;// CONCATENATED MODULE: ./components/footer.jsx




const FooterStyles = external_styled_components_default().footer.withConfig({
  displayName: "footer__FooterStyles",
  componentId: "sc-1ft6hf3-0"
})(["text-align:center;"]);
function Footer() {
  return /*#__PURE__*/jsx_runtime_.jsx(FooterStyles, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
      children: ["\xA9 AllSpreads - ", new Date().getFullYear()]
    })
  });
}
// EXTERNAL MODULE: ./styles/GlobalStyles.js
var GlobalStyles = __webpack_require__(9910);
;// CONCATENATED MODULE: ./components/layout.jsx









const SiteBorderStyles = external_styled_components_default().div.withConfig({
  displayName: "layout__SiteBorderStyles",
  componentId: "sc-8ryk1c-0"
})(["max-width:95vw;margin:12rem auto 4rem auto;margin-top:clamp(2rem,10vw,12rem);padding:5px;background:var(--green);padding:clamp(5px,1vw,25px);box-shadow:0 0 5px 3px rgba(0,0,0,0.044);"]);
const ContentStyles = external_styled_components_default().div.withConfig({
  displayName: "layout__ContentStyles",
  componentId: "sc-8ryk1c-1"
})(["padding:2rem;background-color:white;"]);
function Layout({
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(SiteBorderStyles, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(ContentStyles, {
        children: [/*#__PURE__*/jsx_runtime_.jsx(Nav, {}), /*#__PURE__*/jsx_runtime_.jsx(Header, {}), children]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer, {})]
  });
}

/***/ }),

/***/ 9910:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7518);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);


const GlobalStyles = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)([":root{--black:#2E2E2E;--green:#39b54a;--white:#fff;--grey:#efefef;}html{background-image:url('/bg.svg');background-size:450px;background-attachment:fixed;font-size:10px;scrollbar-width:thin;scrollbar-color:var(--green) var(--white);font-family:Empirez,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Open Sans\",\"Helvetica Neue\",sans-serif;color:var(--black);}body{font-size:2rem;}fieldset{border-color:rgba(0,0,0,0.1);border-width:1px;}button{background:var(--green);color:white;border:0;padding:0.6rem 1rem;border-radius:2px;cursor:pointer;--cast:2px;box-shadow:var(--cast) var(--cast) 0 var(--grey);text-shadow:0.5px 0.5px 0 rgba(0,0,0,0.2);transition:all 0.2s;&:hover{--cast:4px;}}.image-wrapper img[src*=base64\\,]{image-rendering:-moz-crisp-edges;image-rendering:pixelated;}body::-webkit-scrollbar{width:12px;}body::-webkit-scrollbar-track{background:var(--white);}body::-webkit-scrollbar-thumb{background-color:var(--green);border-radius:6px;border:3px solid var(--white);}hr{border:0;height:8px;background-size:1500px;}img{max-width:100%;}.tilt{transform:rotate(-2deg);position:relative;display:inline-block;}@font-face{font-family:'Empirez';src:url('/Empirez.woff') format('woff');font-weight:400;}p,li{letter-spacing:0.5px;}h1,h2,h3,h4,h5,h6{font-weight:normal;margin:0;}a{color:var(--black);text-decoration-color:var(--green);text-decoration-skip-ink:none;}mark,.mark{background:var(--green);padding:0 2px 2px 2px;margin:0;display:inline;line-height:1;}.center{text-align:center;}"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStyles);

/***/ })

};
;