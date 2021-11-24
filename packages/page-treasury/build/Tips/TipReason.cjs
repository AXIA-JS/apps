"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformTip = {
  transform: optBytes => optBytes.isSome ? (0, _util.hexToString)(optBytes.unwrap().toHex()) : null
};

function TipReason(_ref) {
  let {
    hash
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const reasonText = (0, _reactHooks.useCall)((api.query.tips || api.query.treasury).reasons, [hash], transformTip);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
    className: "start all",
    children: reasonText || hash.toHex()
  });
}

var _default = /*#__PURE__*/_react.default.memo(TipReason);

exports.default = _default;