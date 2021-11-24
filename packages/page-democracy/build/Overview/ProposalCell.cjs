"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _ExternalCell = _interopRequireDefault(require("./ExternalCell.cjs"));

var _TreasuryCell = _interopRequireDefault(require("./TreasuryCell.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
const METHOD_EXTE = ['externalPropose', 'externalProposeDefault', 'externalProposeMajority'];
const METHOD_TREA = ['approveProposal', 'rejectProposal'];

function ProposalCell(_ref) {
  let {
    className = '',
    imageHash,
    proposal
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();

  if (!proposal) {
    const textHash = imageHash.toString();
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: `${className} all`,
      children: t('preimage {{hash}}', {
        replace: {
          hash: `${textHash.slice(0, 8)}…${textHash.slice(-8)}`
        }
      })
    });
  }

  const {
    method,
    section
  } = proposal.registry.findMetaCall(proposal.callIndex);
  const isTreasury = section === 'treasury' && METHOD_TREA.includes(method);
  const isExternal = section === 'democracy' && METHOD_EXTE.includes(method);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
    className: `${className} all`,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CallExpander, {
      labelHash: t('proposal hash'),
      value: proposal,
      withHash: !isTreasury && !isExternal,
      children: [isExternal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExternalCell.default, {
        value: proposal.args[0]
      }), isTreasury && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TreasuryCell.default, {
        value: proposal.args[0]
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ProposalCell);

exports.default = _default;