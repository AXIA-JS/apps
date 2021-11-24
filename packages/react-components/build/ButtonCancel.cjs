"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./Button/index.cjs"));

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ButtonCancel(_ref) {
  let {
    className = '',
    isDisabled,
    label,
    onClick,
    tabIndex
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
    className: className,
    icon: "times",
    isDisabled: isDisabled,
    label: label || t('Cancel'),
    onClick: onClick,
    tabIndex: tabIndex
  });
}

var _default = /*#__PURE__*/_react.default.memo(ButtonCancel);

exports.default = _default;