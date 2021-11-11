// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useRef } from 'react';
import { Chart, Spinner } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const COLORS_POINTS = [undefined, '#acacac'];

function extractPoints(points = []) {
  const labels = [];
  const avgSet = [];
  const idxSet = [];
  let avgCount = 0;
  let total = 0;
  points.forEach(({
    era,
    points
  }) => {
    total += points.toNumber();
    labels.push(era.toHuman());

    if (points.gtn(0)) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(points);
  });
  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartPoints({
  validatorId
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const params = useMemo(() => [validatorId, false], [validatorId]);
  const stakerPoints = useCall(api.derive.staking.stakerPoints, params);
  const {
    chart,
    labels
  } = useMemo(() => extractPoints(stakerPoints), [stakerPoints]);
  const legendsRef = useRef([t('points'), t('average')]);
  return /*#__PURE__*/_jsxs("div", {
    className: "staking--Chart",
    children: [/*#__PURE__*/_jsx("h1", {
      children: t('era points')
    }), labels.length ? /*#__PURE__*/_jsx(Chart.Line, {
      colors: COLORS_POINTS,
      labels: labels,
      legends: legendsRef.current,
      values: chart
    }) : /*#__PURE__*/_jsx(Spinner, {})]
  });
}

export default /*#__PURE__*/React.memo(ChartPoints);