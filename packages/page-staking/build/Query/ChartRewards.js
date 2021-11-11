// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { Chart, Spinner } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { formatBalance } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { balanceToNumber } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const COLORS_REWARD = ['#8c2200', '#008c22', '#acacac'];

function extractRewards(erasRewards = [], ownSlashes = [], allPoints = [], divisor) {
  const labels = [];
  const slashSet = [];
  const rewardSet = [];
  const avgSet = [];
  let avgCount = 0;
  let total = 0;
  erasRewards.forEach(({
    era,
    eraReward
  }) => {
    const points = allPoints.find(points => points.era.eq(era));
    const slashed = ownSlashes.find(slash => slash.era.eq(era));
    const reward = points !== null && points !== void 0 && points.eraPoints.gtn(0) ? balanceToNumber(points.points.mul(eraReward).div(points.eraPoints), divisor) : 0;
    const slash = slashed ? balanceToNumber(slashed.total, divisor) : 0;
    total += reward;

    if (reward > 0) {
      avgCount++;
    }

    labels.push(era.toHuman());
    rewardSet.push(reward);
    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    slashSet.push(slash);
  });
  return {
    chart: [slashSet, rewardSet, avgSet],
    labels
  };
}

function ChartRewards({
  validatorId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const params = useMemo(() => [validatorId, false], [validatorId]);
  const ownSlashes = useCall(api.derive.staking.ownSlashes, params);
  const erasRewards = useCall(api.derive.staking.erasRewards);
  const stakerPoints = useCall(api.derive.staking.stakerPoints, params);
  const {
    currency,
    divisor
  } = useMemo(() => ({
    currency: formatBalance.getDefaults().unit,
    divisor: new BN('1'.padEnd(formatBalance.getDefaults().decimals + 1, '0'))
  }), []);
  const {
    chart,
    labels
  } = useMemo(() => extractRewards(erasRewards, ownSlashes, stakerPoints, divisor), [divisor, erasRewards, ownSlashes, stakerPoints]);
  const legends = useMemo(() => [t('{{currency}} slashed', {
    replace: {
      currency
    }
  }), t('{{currency}} rewards', {
    replace: {
      currency
    }
  }), t('{{currency}} average', {
    replace: {
      currency
    }
  })], [currency, t]);
  return /*#__PURE__*/_jsxs("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/_jsx("h1", {
      children: t('rewards & slashes')
    }), labels.length ? /*#__PURE__*/_jsx(Chart.Line, {
      colors: COLORS_REWARD,
      labels: labels,
      legends: legends,
      values: chart
    }) : /*#__PURE__*/_jsx(Spinner, {})]
  });
}

export default /*#__PURE__*/React.memo(ChartRewards);