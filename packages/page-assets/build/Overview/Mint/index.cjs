"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../../translate.cjs");

var _Mint = _interopRequireDefault(require("./Mint.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Mint(_ref) {
  let {
    className,
    details,
    id,
    metadata
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: metadata.isFrozen.isTrue,
      label: t('Mint'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Mint.default, {
      className: className,
      details: details,
      id: id,
      metadata: metadata,
      onClose: toggleOpen
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Mint);

exports.default = _default;