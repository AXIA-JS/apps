// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo, useRef } from 'react';
import { Chart, Spinner } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_BILLION } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MULT = new BN(100 * 100);
const COLORS_POINTS = [undefined, '#acacac'];

function extractPrefs(prefs = []) {
  const labels = [];
  const avgSet = [];
  const idxSet = [];
  let avgCount = 0;
  let total = 0;
  prefs.forEach(({
    era,
    validatorPrefs
  }) => {
    const comm = validatorPrefs.commission.unwrap().mul(MULT).div(BN_BILLION).toNumber() / 100;
    total += comm;
    labels.push(era.toHuman());

    if (comm !== 0) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(comm);
  });
  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartPrefs({
  validatorId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const params = useMemo(() => [validatorId, false], [validatorId]);
  const stakerPrefs = useCall(api.derive.staking.stakerPrefs, params);
  const {
    chart,
    labels
  } = useMemo(() => extractPrefs(stakerPrefs), [stakerPrefs]);
  const legendsRef = useRef([t('commission'), t('average')]);
  return /*#__PURE__*/_jsxs("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/_jsx("h1", {
      children: t('commission')
    }), labels.length ? /*#__PURE__*/_jsx(Chart.Line, {
      colors: COLORS_POINTS,
      labels: labels,
      legends: legendsRef.current,
      values: chart
    }) : /*#__PURE__*/_jsx(Spinner, {})]
  });
}

export default /*#__PURE__*/React.memo(ChartPrefs);