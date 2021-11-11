"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _translate = require("../translate.cjs");

var _Propose = _interopRequireDefault(require("./Propose.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Actions() {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const [showPropose, togglePropose] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button.Group, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
        icon: "plus",
        isDisabled: !hasAccounts,
        label: t('Propose'),
        onClick: togglePropose
      })
    }), showPropose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Propose.default, {
      onClose: togglePropose
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(Actions);

exports.default = _default;