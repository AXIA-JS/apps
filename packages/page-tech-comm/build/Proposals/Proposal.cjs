"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProposalCell = _interopRequireDefault(require("@axia-js/app-democracy/Overview/ProposalCell"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Close = _interopRequireDefault(require("./Close.cjs"));

var _Voting = _interopRequireDefault(require("./Voting.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-tech-comm authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Proposal({
  className = '',
  imageHash,
  members,
  prime,
  type
}) {
  const {
    api
  } = (0, _reactHooks.useApi)();
  const derive = (0, _reactHooks.useCall)(api.derive[type].proposal, [imageHash]);
  const {
    hasFailed,
    isCloseable,
    isVoteable,
    remainingBlocks
  } = (0, _reactHooks.useVotingStatus)(derive === null || derive === void 0 ? void 0 : derive.votes, members.length, type);
  const modLocation = (0, _reactHooks.useCollectiveInstance)(type);

  if (!modLocation || !derive || !derive.votes) {
    return null;
  }

  const {
    ayes,
    end,
    index,
    nays,
    threshold
  } = derive.votes;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: imageHash,
      proposal: derive.proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "number",
      children: [(0, _util.formatNumber)(ayes.length), "/", (0, _util.formatNumber)(threshold)]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: remainingBlocks && end && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: remainingBlocks
        }), "#", (0, _util.formatNumber)(end)]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: ayes.map((address, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: address,
        withBalance: false
      }, `${index}:${address.toHex()}`))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: nays.map((address, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressMini, {
        value: address,
        withBalance: false
      }, `${index}:${address.toHex()}`))
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button",
      children: [isVoteable && !isCloseable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Voting.default, {
        hash: imageHash,
        members: members,
        prime: prime,
        proposalId: index,
        type: type
      }), isCloseable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Close.default, {
        hasFailed: hasFailed,
        hash: imageHash,
        idNumber: index,
        proposal: derive.proposal,
        type: type
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Proposal);

exports.default = _default;