"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _valueToText = _interopRequireDefault(require("@axia-js/react-params/valueToText"));

var _MessageSignature = _interopRequireDefault(require("../shared/MessageSignature.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Outcome({
  className = '',
  onClear,
  outcome: {
    from,
    message,
    output,
    params,
    result,
    when
  }
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.IdentityIcon, {
      value: from
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Output, {
      className: "output",
      isError: !result.isOk,
      isFull: true,
      label: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageSignature.default, {
        message: message,
        params: params
      }),
      labelExtra: /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
        className: "date-time",
        children: [when.toLocaleDateString(), ' ', when.toLocaleTimeString()]
      }),
      value: (0, _valueToText.default)('Text', result.isOk ? output : result)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "times",
      onClick: onClear
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Outcome).withConfig({
  displayName: "Outcome",
  componentId: "sc-5fz2zr-0"
})(["align-items:center;display:flex;.output{flex:1 1;margin:0.25rem 0.5rem;}"]));

exports.default = _default;