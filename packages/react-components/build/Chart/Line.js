// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import ChartJs from 'chart.js';
import React, { useMemo } from 'react';
import * as Chart from 'react-chartjs-2';
import { isBn } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
const COLORS = ['#ff8c00', '#008c8c', '#8c008c'];

const alphaColor = hexColor => // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
ChartJs.helpers.color(hexColor).alpha(0.65).rgbString();

const chartOptions = {
  // no need for the legend, expect the labels contain everything
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

function calculateOptions(colors = [], legends, labels, values) {
  const chartData = values.reduce((chartData, values, index) => {
    const color = colors[index] || alphaColor(COLORS[index]);
    const data = values.map(value => isBn(value) ? value.toNumber() : value);
    chartData.datasets.push({
      backgroundColor: color,
      borderColor: color,
      data,
      fill: false,
      hoverBackgroundColor: color,
      label: legends[index]
    });
    return chartData;
  }, {
    datasets: [],
    labels
  });
  return {
    chartData,
    chartOptions
  };
}

function LineChart({
  className,
  colors,
  labels,
  legends,
  values
}) {
  const {
    chartData,
    chartOptions
  } = useMemo(() => calculateOptions(colors, legends, labels, values), [colors, labels, legends, values]);
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Chart.Line, {
      data: chartData,
      options: chartOptions
    })
  });
}

export default /*#__PURE__*/React.memo(LineChart);