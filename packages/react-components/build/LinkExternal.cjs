"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _appsConfig = require("@axia-js/apps-config");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
// function shortName (name: string): string {
//   return `${name[0]}${name[name.length - 1]}`;
// }
function genLinks(systemChain, _ref) {
  let {
    data,
    hash,
    isLogo,
    isSidebar,
    type
  } = _ref;
  return Object.entries(_appsConfig.externalLinks).map(_ref2 => {
    let [name, {
      chains,
      create,
      isActive,
      logo,
      paths,
      url
    }] = _ref2;
    const extChain = chains[systemChain];
    const extPath = paths[type];

    if (!isActive || !extChain || !extPath) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      href: create(extChain, extPath, data, hash),
      rel: "noopener noreferrer",
      target: "_blank",
      title: `${name}, ${url}`,
      children: isLogo ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
        className: `${isSidebar ? ' isSidebar' : ''}`,
        src: logo
      }) : name
    }, name);
  }).filter(node => !!node);
}

function LinkExternal(_ref3) {
  let {
    className = '',
    data,
    hash,
    isLogo,
    isSidebar,
    isSmall,
    type
  } = _ref3;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    systemChain
  } = (0, _reactHooks.useApi)();
  const links = (0, _react.useMemo)(() => genLinks(systemChain, {
    data,
    hash,
    isLogo,
    isSidebar,
    type
  }), [systemChain, data, hash, isLogo, isSidebar, type]);

  if (!links.length) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `${className}${isLogo ? ' isLogo' : ''}${isSmall ? ' isSmall' : ''}${isSidebar ? ' isSidebar' : ''}`,
    children: [!(isLogo || isSmall) && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: t('View this externally')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "links",
      children: links.map((link, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: link
      }, index))
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(LinkExternal).withConfig({
  displayName: "LinkExternal",
  componentId: "sc-9cloov-0"
})(["text-align:right;&.isSmall{font-size:0.85rem;line-height:1.35;text-align:center;}&.isSidebar{text-align:center;}&.isLogo{line-height:1;.links{white-space:nowrap;}}.links{img{border-radius:50%;cursor:pointer;filter:grayscale(1) opacity(0.66);height:1.5rem;width:1.5rem;&.isSidebar{height:2rem;width:2rem;}&:hover{filter:grayscale(0) opacity(1);}}span{word-wrap:normal;display:inline-block;}span+span{margin-left:0.3rem;}}"]));

exports.default = _default;