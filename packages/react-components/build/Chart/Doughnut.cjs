"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactChartjs = require("react-chartjs-2");

var _util = require("@axia-js/util");

var _Base = _interopRequireDefault(require("./Base.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ChartDoughnut(_ref) {
  let {
    className = '',
    size = 100,
    values
  } = _ref;
  const options = {
    colorHover: [],
    colorNormal: [],
    data: [],
    labels: []
  };
  values.forEach(_ref2 => {
    let {
      colors: [normalColor = '#00f', hoverColor],
      label,
      value
    } = _ref2;
    options.colorNormal.push(normalColor);
    options.colorHover.push(hoverColor || normalColor);
    options.data.push((0, _util.bnToBn)(value).toNumber());
    options.labels.push(label);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Base.default, {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactChartjs.Doughnut, {
      data: {
        datasets: [{
          backgroundColor: options.colorNormal,
          data: options.data,
          hoverBackgroundColor: options.colorHover
        }],
        labels: options.labels
      },
      height: size,
      width: size
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ChartDoughnut);

exports.default = _default;