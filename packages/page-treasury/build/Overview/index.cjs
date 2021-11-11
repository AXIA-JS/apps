"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _ProposalCreate = _interopRequireDefault(require("./ProposalCreate.cjs"));

var _Proposals = _interopRequireDefault(require("./Proposals.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Overview({
  className,
  isMember,
  members
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const info = (0, _reactHooks.useCall)(api.derive.treasury.proposals);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      approvalCount: info === null || info === void 0 ? void 0 : info.approvals.length,
      proposalCount: info === null || info === void 0 ? void 0 : info.proposals.length
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCreate.default, {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposals.default, {
      isMember: isMember,
      members: members,
      proposals: info === null || info === void 0 ? void 0 : info.proposals
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Proposals.default, {
      isApprovals: true,
      isMember: isMember,
      members: members,
      proposals: info === null || info === void 0 ? void 0 : info.approvals
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;