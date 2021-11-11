"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chart = _interopRequireDefault(require("chart.js"));

var _react = _interopRequireWildcard(require("react"));

var Chart = _interopRequireWildcard(require("react-chartjs-2"));

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const COLORS = ['#ff8c00', '#008c8c', '#8c008c'];

const alphaColor = hexColor => // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
_chart.default.helpers.color(hexColor).alpha(0.65).rgbString();

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
    const data = values.map(value => (0, _util.isBn)(value) ? value.toNumber() : value);
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
  } = (0, _react.useMemo)(() => calculateOptions(colors, legends, labels, values), [colors, labels, legends, values]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Chart.Line, {
      data: chartData,
      options: chartOptions
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(LineChart);

exports.default = _default;