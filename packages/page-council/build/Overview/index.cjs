"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _useModuleElections = require("../useModuleElections.cjs");

var _Candidates = _interopRequireDefault(require("./Candidates.cjs"));

var _Members = _interopRequireDefault(require("./Members.cjs"));

var _SubmitCandidacy = _interopRequireDefault(require("./SubmitCandidacy.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _Vote = _interopRequireDefault(require("./Vote.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformVotes = {
  transform: entries => entries.reduce((result, _ref) => {
    let [voter, {
      votes
    }] = _ref;
    votes.forEach(candidate => {
      const address = candidate.toString();

      if (!result[address]) {
        result[address] = [];
      }

      result[address].push(voter);
    });
    return result;
  }, {})
};

function Overview(_ref2) {
  let {
    className = '',
    prime
  } = _ref2;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const electionsInfo = (0, _reactHooks.useCall)(api.derive.elections.info);
  const allVotes = (0, _reactHooks.useCall)(api.derive.council.votes, undefined, transformVotes);
  const modElections = (0, _useModuleElections.useModuleElections)();
  const hasElections = !!modElections;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      bestNumber: bestNumber,
      electionsInfo: electionsInfo,
      hasElections: !!modElections
    }), hasElections && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Button.Group, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Vote.default, {
        electionsInfo: electionsInfo
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubmitCandidacy.default, {
        electionsInfo: electionsInfo
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Members.default, {
      allVotes: allVotes,
      electionsInfo: electionsInfo,
      hasElections: hasElections,
      prime: prime
    }), hasElections && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Candidates.default, {
      allVotes: allVotes,
      electionsInfo: electionsInfo
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Overview);

exports.default = _default;