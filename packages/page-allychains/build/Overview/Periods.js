// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { BN_ONE, formatNumber } from '@axia-js/util';
import LeaseBlocks from "./LeaseBlocks.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Periods({
  className,
  fromFirst,
  leasePeriod,
  periods
}) {
  const mapped = useMemo(() => (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod) && periods && periods.reduce((all, period) => {
    const bnp = leasePeriod.currentPeriod.addn(period);

    if (!all.length || all[all.length - 1][1].add(BN_ONE).lt(bnp)) {
      all.push([bnp, bnp]);
    } else {
      all[all.length - 1][1] = bnp;
    }

    return all;
  }, []).map(([a, b]) => a.eq(b) ? formatNumber(a) : `${formatNumber(a)} - ${formatNumber(b)}`).join(', '), [leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod, periods]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      children: mapped
    }), periods && /*#__PURE__*/_jsx(LeaseBlocks, {
      leasePeriod: leasePeriod,
      value: fromFirst ? periods[0] : periods[periods.length - 1] + 1
    })]
  });
}

export default /*#__PURE__*/React.memo(Periods);