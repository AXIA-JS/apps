"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _BlockHeaders = _interopRequireDefault(require("./BlockHeaders.cjs"));

var _Events = _interopRequireDefault(require("./Events.cjs"));

var _Query = _interopRequireDefault(require("./Query.cjs"));

var _Summary = _interopRequireDefault(require("./Summary.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Main(_ref) {
  let {
    eventCount,
    events,
    headers
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Query.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Summary.default, {
      eventCount: eventCount
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BlockHeaders.default, {
          headers: headers
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Events.default, {
          events: events
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Main);

exports.default = _default;