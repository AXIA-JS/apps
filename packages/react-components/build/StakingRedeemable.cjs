"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("./translate.cjs");

var _TxButton = _interopRequireDefault(require("./TxButton.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const transformSpan = {
  transform: optSpans => optSpans.isNone ? 0 : optSpans.unwrap().prior.length + 1
};

function StakingRedeemable(_ref) {
  var _stakingInfo$redeemab;

  let {
    className = '',
    stakingInfo
  } = _ref;
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const {
    t
  } = (0, _translate.useTranslation)();
  const spanCount = (0, _reactHooks.useCall)(api.query.staking.slashingSpans, [stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.stashId], transformSpan);

  if (!(stakingInfo !== null && stakingInfo !== void 0 && (_stakingInfo$redeemab = stakingInfo.redeemable) !== null && _stakingInfo$redeemab !== void 0 && _stakingInfo$redeemab.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
      value: stakingInfo.redeemable,
      children: allAccounts.includes((stakingInfo.controllerId || '').toString()) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_TxButton.default, {
        accountId: stakingInfo.controllerId,
        icon: "lock",
        isIcon: true,
        params: api.tx.staking.withdrawUnbonded.meta.args.length === 1 ? [spanCount] : [],
        tooltip: t('Withdraw these unbonded funds'),
        tx: api.tx.staking.withdrawUnbonded
      }, 'unlock')
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(StakingRedeemable);

exports.default = _default;