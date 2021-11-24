"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _CopyButton = _interopRequireDefault(require("./CopyButton.cjs"));

var _Labelled = _interopRequireDefault(require("./Labelled.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Output(_ref) {
  let {
    children,
    className = '',
    help,
    isDisabled,
    isError,
    isFull,
    isHidden,
    isMonospace,
    isSmall,
    isTrimmed,
    label,
    labelExtra,
    value,
    withCopy = false,
    withLabel
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Labelled.default, {
    className: className,
    help: help,
    isFull: isFull,
    isHidden: isHidden,
    isSmall: isSmall,
    label: label,
    labelExtra: labelExtra,
    withLabel: withLabel,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: `ui--output ui dropdown selection ${isError ? ' error' : ''}${isMonospace ? ' monospace' : ''}${isDisabled ? ' disabled' : ''}`,
      children: [isTrimmed && value && value.length > 256 ? `${value.substr(0, 96)}…${value.substr(-96)}` : value, children]
    }), withCopy && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CopyButton.default, {
      value: value
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Output).withConfig({
  displayName: "Output",
  componentId: "sc-9kgxhy-0"
})(["pre{margin:0;overflow:hidden;text-overflow:ellipsis;}"]));

exports.default = _default;