"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../translate.cjs");

var _Bare = _interopRequireDefault(require("./Bare.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function StaticParam(_ref) {
  let {
    asHex,
    children,
    childrenPre,
    className = '',
    defaultValue,
    label
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const value = defaultValue && defaultValue.value && (asHex ? defaultValue.value.toHex() : JSON.stringify(defaultValue.value.toHuman ? defaultValue.value.toHuman() : defaultValue.value, null, 2).replace(/"/g, '').replace(/\\/g, '').replace(/\],\[/g, '],\n['));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Bare.default, {
    className: className,
    children: [childrenPre, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Static, {
      className: "full",
      label: label,
      value: /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
        children: value || t('<empty>')
      })
    }), children]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(StaticParam).withConfig({
  displayName: "Static",
  componentId: "sc-1cj81ks-0"
})(["pre{margin:0;overflow:hidden;text-overflow:ellipsis;}.ui--Static{margin-bottom:0 !important;}"]));

exports.default = _default;