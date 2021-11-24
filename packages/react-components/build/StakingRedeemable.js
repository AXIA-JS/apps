// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useAccounts, useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { useTranslation } from "./translate.js";
import TxButton from "./TxButton.js";
import { jsx as _jsx } from "react/jsx-runtime";
const transformSpan = {
  transform: optSpans => optSpans.isNone ? 0 : optSpans.unwrap().prior.length + 1
};

function StakingRedeemable({
  className = '',
  stakingInfo
}) {
  var _stakingInfo$redeemab;

  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const {
    t
  } = useTranslation();
  const spanCount = useCall(api.query.staking.slashingSpans, [stakingInfo === null || stakingInfo === void 0 ? void 0 : stakingInfo.stashId], transformSpan);

  if (!(stakingInfo !== null && stakingInfo !== void 0 && (_stakingInfo$redeemab = stakingInfo.redeemable) !== null && _stakingInfo$redeemab !== void 0 && _stakingInfo$redeemab.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(FormatBalance, {
      value: stakingInfo.redeemable,
      children: allAccounts.includes((stakingInfo.controllerId || '').toString()) && /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(StakingRedeemable);