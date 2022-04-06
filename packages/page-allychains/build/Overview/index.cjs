"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Allychains = _interopRequireDefault(require("./Allychains.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview(_ref) {
  let {
    actionsQueue,
    className,
    leasePeriod,
    allyIds,
    proposals,
    threadIds
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      leasePeriod: leasePeriod,
      allychainCount: allyIds === null || allyIds === void 0 ? void 0 : allyIds.length,
      proposalCount: proposals === null || proposals === void 0 ? void 0 : proposals.proposalIds.length,
      upcomingCount: threadIds === null || threadIds === void 0 ? void 0 : threadIds.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Allychains.default, {
      actionsQueue: actionsQueue,
      ids: allyIds,
      leasePeriod: leasePeriod,
      scheduled: proposals === null || proposals === void 0 ? void 0 : proposals.scheduled
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;