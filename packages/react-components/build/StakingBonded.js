// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { FormatBalance } from '@axia-js/react-query';
import { jsx as _jsx } from "react/jsx-runtime";

function StakingBonded({
  className = '',
  stakingInfo
}) {
  var _stakingInfo$stakingL, _stakingInfo$stakingL2;

  const balance = stakingInfo === null || stakingInfo === void 0 ? void 0 : (_stakingInfo$stakingL = stakingInfo.stakingLedger) === null || _stakingInfo$stakingL === void 0 ? void 0 : (_stakingInfo$stakingL2 = _stakingInfo$stakingL.active) === null || _stakingInfo$stakingL2 === void 0 ? void 0 : _stakingInfo$stakingL2.unwrap();

  if (!(balance !== null && balance !== void 0 && balance.gtn(0))) {
    return null;
  }

  return /*#__PURE__*/_jsx(FormatBalance, {
    className: className,
    value: balance
  });
}

export default /*#__PURE__*/React.memo(StakingBonded);