"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BountyActions = BountyActions;

var _react = _interopRequireWildcard(require("react"));

var _index = require("../hooks/index.cjs");

var _AwardBounty = _interopRequireDefault(require("./AwardBounty.cjs"));

var _BountyAcceptCurator = _interopRequireDefault(require("./BountyAcceptCurator.cjs"));

var _BountyClaimAction = _interopRequireDefault(require("./BountyClaimAction.cjs"));

var _BountyInitiateVoting = _interopRequireDefault(require("./BountyInitiateVoting.cjs"));

var _ProposeCuratorAction = _interopRequireDefault(require("./ProposeCuratorAction.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyActions(_ref) {
  let {
    bestNumber,
    description,
    fee,
    index,
    proposals,
    status,
    value
  } = _ref;
  const {
    beneficiary,
    curator,
    unlockAt
  } = (0, _index.useBountyStatus)(status);
  const blocksUntilPayout = (0, _react.useMemo)(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [status.isProposed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInitiateVoting.default, {
      description: description,
      index: index,
      proposals: proposals
    }), status.isFunded && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ProposeCuratorAction.default, {
      description: description,
      index: index,
      proposals: proposals,
      value: value
    }), status.isCuratorProposed && curator && fee && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyAcceptCurator.default, {
      curatorId: curator,
      description: description,
      fee: fee,
      index: index
    }), status.isPendingPayout && beneficiary && blocksUntilPayout && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyClaimAction.default, {
      beneficiaryId: beneficiary,
      index: index,
      payoutDue: blocksUntilPayout
    }), status.isActive && curator && /*#__PURE__*/(0, _jsxRuntime.jsx)(_AwardBounty.default, {
      curatorId: curator,
      description: description,
      index: index
    })]
  });
}