"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING = void 0;

var _bn = _interopRequireDefault(require("bn.js"));

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("@axia-js/app-bounties/hooks");

var _util = require("@axia-js/util");

var _index = require("../hooks/index.cjs");

var _translate = require("../translate.cjs");

var _BountyInfo = _interopRequireDefault(require("./BountyInfo.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
const BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING = 10;
exports.BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING = BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING;
const BLOCKS_LEFT_TO_SHOW_WARNING = new _bn.default('10000');

function BountyActionMessage({
  bestNumber,
  blocksUntilUpdate,
  status
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    unlockAt
  } = (0, _hooks.useBountyStatus)(status);
  const {
    bountyUpdatePeriod
  } = (0, _index.useBounties)();
  const blocksUntilPayout = (0, _react.useMemo)(() => unlockAt === null || unlockAt === void 0 ? void 0 : unlockAt.sub(bestNumber), [bestNumber, unlockAt]);
  const blocksPercentageLeftToShowWarning = bountyUpdatePeriod === null || bountyUpdatePeriod === void 0 ? void 0 : bountyUpdatePeriod.muln(BLOCKS_PERCENTAGE_LEFT_TO_SHOW_WARNING).div(_util.BN_HUNDRED);
  const blocksToShowWarning = blocksPercentageLeftToShowWarning !== null && blocksPercentageLeftToShowWarning !== void 0 ? blocksPercentageLeftToShowWarning : BLOCKS_LEFT_TO_SHOW_WARNING;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [(blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.lte(_util.BN_ZERO)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInfo.default, {
      description: t('Update overdue'),
      type: "warning"
    }), (blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.lt(blocksToShowWarning)) && (blocksUntilUpdate === null || blocksUntilUpdate === void 0 ? void 0 : blocksUntilUpdate.gt(_util.BN_ZERO)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInfo.default, {
      description: t('Close deadline'),
      type: "warning"
    }), status.isApproved && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInfo.default, {
      description: t('Waiting for Bounty Funding'),
      type: "info"
    }), status.isCuratorProposed && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInfo.default, {
      description: t("Waiting for Curator's acceptance"),
      type: "info"
    }), (blocksUntilPayout === null || blocksUntilPayout === void 0 ? void 0 : blocksUntilPayout.lt(_util.BN_ZERO)) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_BountyInfo.default, {
      description: t('Waiting for implementer to claim'),
      type: "info"
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(BountyActionMessage);

exports.default = _default;