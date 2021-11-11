"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ProposalCell = _interopRequireDefault(require("@axia-js/app-democracy/Overview/ProposalCell"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _Close = _interopRequireDefault(require("./Close.cjs"));

var _Voters = _interopRequireDefault(require("./Voters.cjs"));

var _Voting = _interopRequireDefault(require("./Voting.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-council authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Motion({
  className = '',
  isMember,
  members,
  motion: {
    hash,
    proposal,
    votes
  },
  prime
}) {
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    hasFailed,
    isCloseable,
    isVoteable,
    remainingBlocks
  } = (0, _reactHooks.useVotingStatus)(votes, members.length, 'council');
  const modLocation = (0, _reactHooks.useCollectiveInstance)('council');
  const {
    hasVoted,
    hasVotedAye
  } = (0, _react.useMemo)(() => {
    if (votes) {
      const hasVotedAye = allAccounts.some(address => votes.ayes.some(accountId => accountId.eq(address)));
      return {
        hasVoted: hasVotedAye || allAccounts.some(address => votes.nays.some(accountId => accountId.eq(address))),
        hasVotedAye
      };
    }

    return {
      hasVoted: false,
      hasVotedAye: false
    };
  }, [allAccounts, votes]);

  if (!votes || !modLocation) {
    return null;
  }

  const {
    ayes,
    end,
    index,
    nays,
    threshold
  } = votes;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: (0, _util.formatNumber)(index)
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposalCell.default, {
      imageHash: hash,
      proposal: proposal
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: (0, _util.formatNumber)(threshold)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: remainingBlocks && end && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: remainingBlocks
        }), "#", (0, _util.formatNumber)(end)]
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "expand",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Voters.default, {
        isAye: true,
        members: members,
        threshold: threshold,
        votes: ayes
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Voters.default, {
        members: members,
        threshold: threshold,
        votes: nays
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button",
      children: [isVoteable && !isCloseable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Voting.default, {
        hash: hash,
        idNumber: index,
        isDisabled: !isMember,
        members: members,
        prime: prime,
        proposal: proposal
      }), isCloseable && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Close.default, {
        hasFailed: hasFailed,
        hash: hash,
        idNumber: index,
        proposal: proposal
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "badge",
      children: isMember && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
        color: hasVoted ? hasVotedAye ? 'green' : 'red' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "links",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.LinkExternal, {
        data: index,
        hash: hash.toString(),
        isLogo: true,
        type: "council"
      })
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Motion);

exports.default = _default;