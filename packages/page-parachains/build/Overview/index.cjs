"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Parachains = _interopRequireDefault(require("./Parachains.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  actionsQueue,
  className,
  leasePeriod,
  paraIds,
  proposals,
  threadIds
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      leasePeriod: leasePeriod,
      parachainCount: paraIds === null || paraIds === void 0 ? void 0 : paraIds.length,
      proposalCount: proposals === null || proposals === void 0 ? void 0 : proposals.proposalIds.length,
      upcomingCount: threadIds === null || threadIds === void 0 ? void 0 : threadIds.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Parachains.default, {
      actionsQueue: actionsQueue,
      ids: paraIds,
      leasePeriod: leasePeriod,
      scheduled: proposals === null || proposals === void 0 ? void 0 : proposals.scheduled
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;