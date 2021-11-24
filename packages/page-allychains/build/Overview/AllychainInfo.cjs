"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformHeader = {
  transform: header => header.number.unwrap()
};

function AllychainInfo(_ref) {
  let {
    className,
    id
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useParaApi)(id);
  const bestNumber = (0, _reactHooks.useCall)(api === null || api === void 0 ? void 0 : api.rpc.chain.subscribeNewHeads, undefined, transformHeader);
  const runtimeVersion = (0, _reactHooks.useCall)(api === null || api === void 0 ? void 0 : api.rpc.state.subscribeRuntimeVersion);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: (0, _util.formatNumber)(bestNumber)
    }), runtimeVersion && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "version",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "media--1100",
        children: runtimeVersion.specName.toString()
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "media--1100",
        children: "/"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: runtimeVersion.specVersion.toString()
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(AllychainInfo).withConfig({
  displayName: "AllychainInfo",
  componentId: "sc-fq0zxp-0"
})([".version{font-size:0.85rem;white-space:nowrap;> div{display:inline-block;overflow:hidden;max-width:10em;text-overflow:ellipsis;}}"]));

exports.default = _default;