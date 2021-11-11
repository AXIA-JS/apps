"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function MaxBadge({
  numNominators
}) {
  var _api$consts$staking;

  const {
    api
  } = (0, _reactHooks.useApi)();
  const max = (_api$consts$staking = api.consts.staking) === null || _api$consts$staking === void 0 ? void 0 : _api$consts$staking.maxNominatorRewardedPerValidator;

  if (!numNominators || !max || max.gten(numNominators)) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
    color: "red",
    icon: "balance-scale-right"
  });
}

var _default = /*#__PURE__*/_react.default.memo(MaxBadge);

exports.default = _default;