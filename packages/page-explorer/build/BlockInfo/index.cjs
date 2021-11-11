"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _Query = _interopRequireDefault(require("../Query.cjs"));

var _ByHash = _interopRequireDefault(require("./ByHash.cjs"));

var _ByNumber = _interopRequireDefault(require("./ByNumber.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Entry() {
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const {
    value
  } = (0, _reactRouterDom.useParams)();
  const [stateValue, setStateValue] = (0, _react.useState)(value);
  (0, _react.useEffect)(() => {
    setStateValue(stateValue => value && value !== stateValue ? value : !stateValue && bestNumber ? bestNumber.toString() : stateValue);
  }, [bestNumber, value]);

  if (!stateValue) {
    return null;
  }

  const Component = (0, _util.isHex)(stateValue) ? _ByHash.default : _ByNumber.default;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Query.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      value: stateValue
    }, stateValue)]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Entry);

exports.default = _default;