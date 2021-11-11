"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chart = _interopRequireDefault(require("chart.js"));

var _react = _interopRequireWildcard(require("react"));

var _reactChartjs = require("react-chartjs-2");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
const alphaColor = hexColor => // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
_chart.default.helpers.color(hexColor).alpha(0.65).rgbString();

function calculateOptions(aspectRatio, values, jsonValues, max, showLabels) {
  const chartData = values.reduce((data, {
    colors: [normalColor = '#00f', hoverColor],
    label,
    value
  }) => {
    const dataset = data.datasets[0];
    dataset.backgroundColor.push(alphaColor(normalColor));
    dataset.hoverBackgroundColor.push(alphaColor(hoverColor || normalColor));
    dataset.data.push((0, _util.isNumber)(value) ? value : (0, _util.bnToBn)(value).toNumber());
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
  }, setState] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    const newJsonValues = JSON.stringify(values);

    if (newJsonValues !== jsonValues) {
      setState(calculateOptions(aspectRatio, values, newJsonValues, max, showLabels));
    }
  }, [aspectRatio, jsonValues, max, showLabels, values]);

  if (!chartData) {
    return null;
  } // HACK on width/height to get the aspectRatio to work


  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactChartjs.HorizontalBar, {
      data: chartData,
      height: null,
      options: chartOptions,
      width: null
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartHorizBar);

exports.default = _default;