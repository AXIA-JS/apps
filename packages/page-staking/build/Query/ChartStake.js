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
const COLORS_STAKE = [undefined, '#8c2200', '#acacac'];

function extractStake(exposures = [], divisor) {
  const labels = [];
  const cliSet = [];
  const expSet = [];
  const avgSet = [];
  let avgCount = 0;
  let total = 0;
  exposures.forEach(({
    clipped,
    era,
    exposure
  }) => {
    var _clipped$total, _exposure$total;

    // Darwinia Crab doesn't have the total field
    const cli = balanceToNumber((_clipped$total = clipped.total) === null || _clipped$total === void 0 ? void 0 : _clipped$total.unwrap(), divisor);
    const exp = balanceToNumber((_exposure$total = exposure.total) === null || _exposure$total === void 0 ? void 0 : _exposure$total.unwrap(), divisor);
    total += cli;

    if (cli > 0) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    labels.push(era.toHuman());
    cliSet.push(cli);
    expSet.push(exp);
  });
  return {
    chart: [cliSet, expSet, avgSet],
    labels
  };
}

function ChartStake({
  validatorId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const params = useMemo(() => [validatorId, false], [validatorId]);
  const ownExposures = useCall(api.derive.staking.ownExposures, params);
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
  } = useMemo(() => extractStake(ownExposures, divisor), [divisor, ownExposures]);
  const legends = useMemo(() => [t('{{currency}} clipped', {
    replace: {
      currency
    }
  }), t('{{currency}} total', {
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
      children: t('elected stake')
    }), labels.length ? /*#__PURE__*/_jsx(Chart.Line, {
      colors: COLORS_STAKE,
      labels: labels,
      legends: legends,
      values: chart
    }) : /*#__PURE__*/_jsx(Spinner, {})]
  });
}

export default /*#__PURE__*/React.memo(ChartStake);