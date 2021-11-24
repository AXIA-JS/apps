"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Event(_ref) {
  let {
    className = '',
    value: {
      event
    }
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
    className: className,
    summary: `${event.section}.${event.method}`,
    summaryMeta: event.meta,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Event, {
      className: "details",
      value: event
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Event);

exports.default = _default;