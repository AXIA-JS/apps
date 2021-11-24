"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
const TICK_TIMEOUT = 100;
const tickers = new Map();
let lastNow = Date.now();
let lastId = 0;

function tick() {
  lastNow = Date.now();

  for (const ticker of tickers.values()) {
    ticker(lastNow);
  }

  setTimeout(tick, TICK_TIMEOUT);
}

function formatValue(value) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 's';
  let withDecimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const [pre, post] = value.toFixed(1).split('.');
  const before = pre.split('').map((d, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "digit",
    children: d
  }, index));
  return withDecimal ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [before, ".", /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "digit",
      children: post
    }), " ", type]
  }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [before, " ", type]
  });
}

function getDisplayValue() {
  let now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const tsValue = (value && value.getTime ? value.getTime() : (0, _util.bnToBn)(value).toNumber()) || 0;

  if (!now || !tsValue) {
    return formatValue(0, 's', true);
  }

  const elapsed = Math.max(Math.abs(now - tsValue), 0) / 1000;
  return elapsed < 60 ? formatValue(elapsed, 's', elapsed < 15) : elapsed < 3600 ? formatValue(elapsed / 60, 'min') : formatValue(elapsed / 3600, 'hr');
}

tick();

function Elapsed(_ref) {
  let {
    children,
    className = '',
    value
  } = _ref;
  const [now, setNow] = (0, _react.useState)(lastNow);
  (0, _react.useEffect)(() => {
    const id = lastId++;
    tickers.set(id, setNow);
    return () => {
      tickers.delete(id);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: `ui--Elapsed ${className}`,
    children: [getDisplayValue(now, value), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Elapsed).withConfig({
  displayName: "Elapsed",
  componentId: "sc-53dy7o-0"
})([".digit{display:inline-block;width:1ch;}"]));

exports.default = _default;