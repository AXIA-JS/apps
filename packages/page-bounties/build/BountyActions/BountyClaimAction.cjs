"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hooks = require("@axia-js/app-bounties/hooks");

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _index = require("../helpers/index.cjs");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
function BountyClaimAction({
  beneficiaryId,
  index,
  payoutDue
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    claimBounty
  } = (0, _hooks.useBounties)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const isBountyClaimable = (0, _react.useMemo)(() => (0, _index.isClaimable)(allAccounts, beneficiaryId, payoutDue), [allAccounts, beneficiaryId, payoutDue]);
  return isBountyClaimable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
    accountId: beneficiaryId,
    icon: "plus",
    label: t('Claim'),
    params: [index],
    tx: claimBounty
  }) : null;
}

var _default = /*#__PURE__*/_react.default.memo(BountyClaimAction);

exports.default = _default;