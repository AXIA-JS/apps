"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _Assets = _interopRequireDefault(require("./Assets.cjs"));

var _index = _interopRequireDefault(require("./Create/index.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  className,
  ids,
  infos,
  openId
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      numAssets: ids === null || ids === void 0 ? void 0 : ids.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        assetIds: ids,
        openId: openId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Assets.default, {
      infos: infos
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;