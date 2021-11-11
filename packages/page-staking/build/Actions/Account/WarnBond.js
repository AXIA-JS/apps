// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { MarkWarning } from '@axia-js/react-components';
import { formatBalance } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function WarnBond({
  minBond,
  stakingInfo
}) {
  const {
    t
  } = useTranslation();
  const isBelow = useMemo(() => minBond && stakingInfo && stakingInfo.stakingLedger.active.unwrap().lt(minBond), [minBond, stakingInfo]);
  return isBelow ? /*#__PURE__*/_jsx(MarkWarning, {
    content: t('Your bonded amount is below the on-chain minimum threshold of {{minBond}} and may be chilled. Bond extra funds to increase the bonded amount.', {
      replace: {
        minBond: formatBalance(minBond)
      }
    })
  }) : null;
}

export default /*#__PURE__*/React.memo(WarnBond);