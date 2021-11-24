"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _Votes = _interopRequireDefault(require("../Overview/Votes.cjs"));

var _BidType = _interopRequireDefault(require("./BidType.cjs"));

var _CandidateVoting = _interopRequireDefault(require("./CandidateVoting.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Candidate(_ref) {
  let {
    allMembers,
    isMember,
    ownMembers,
    value: {
      accountId,
      kind,
      value
    }
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const votes = (0, _reactHooks.useCall)(api.query.society.votes.multi, [allMembers.map(memberId => [accountId, memberId])], {
    transform: voteOpts => voteOpts.map((voteOpt, index) => [allMembers[index], voteOpt]).filter(_ref2 => {
      let [, voteOpt] = _ref2;
      return voteOpt.isSome;
    }).map(_ref3 => {
      let [accountId, voteOpt] = _ref3;
      return [accountId, voteOpt.unwrap()];
    })
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address all",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BidType.default, {
      value: kind
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Votes.default, {
      votes: votes
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "button",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CandidateVoting.default, {
        candidateId: accountId.toString(),
        isMember: isMember,
        ownMembers: ownMembers
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Candidate);

exports.default = _default;