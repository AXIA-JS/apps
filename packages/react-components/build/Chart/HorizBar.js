// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import ChartJs from 'chart.js';
import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { bnToBn, isNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";

const alphaColor = hexColor => // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
ChartJs.helpers.color(hexColor).alpha(0.65).rgbString();

function calculateOptions(aspectRatio, values, jsonValues, max, showLabels) {
  const chartData = values.reduce((data, {
    colors: [normalColor = '#00f', hoverColor],
    label,
    value
  }) => {
    const dataset = data.datasets[0];
    dataset.backgroundColor.push(alphaColor(normalColor));
    dataset.hoverBackgroundColor.push(alphaColor(hoverColor || normalColor));
    dataset.data.push(isNumber(value) ? value : bnToBn(value).toNumber());
    data.labels.push(label);
    return data;
  }, {
    datasets: [{
      backgroundColor: [],
      data: [],
      hoverBackgroundColor: []
    }],
    labels: []
  });
  return {
    chartData,
    chartOptions: {
      // width/height by default this is "1", i.e. a square box
      aspectRatio,
      // no need for the legend, expect the labels contain everything
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: showLabels ? {
            beginAtZero: true,
            max
          } : {
            display: false
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: item => values[item.index].tooltip || values[item.index].label
        }
      }
    },
    jsonValues
  };
}

function ChartHorizBar({
  aspectRatio = 8,
  className = '',
  max = 100,
  showLabels = false,
  values
}) {
  const [{
    chartData,
    chartOptions,
    jsonValues
  }, setState] = useState({});
  useEffect(() => {
    const newJsonValues = JSON.stringify(values);

    if (newJsonValues !== jsonValues) {
      setState(calculateOptions(aspectRatio, values, newJsonValues, max, showLabels));
    }
  }, [aspectRatio, jsonValues, max, showLabels, values]);

  if (!chartData) {
    return null;
  } // HACK on width/height to get the aspectRatio to work


  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(HorizontalBar, {
      data: chartData,
      height: null,
      options: chartOptions,
      width: null
    })
  });
}

export default /*#__PURE__*/React.memo(ChartHorizBar);