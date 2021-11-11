"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Legend({
  className,
  isRelay
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "blue",
        icon: "chevron-right"
      }), t('Next session')]
    }), isRelay && /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "purple",
        icon: "vector-square"
      }), t('Para validator')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "green",
        info: "5"
      }), t('Produced blocks')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "green",
        info: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Icon, {
          icon: "envelope"
        })
      }), t('Online message')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "green",
        icon: "hand-paper"
      }), t('Nominating')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        icon: "balance-scale-right"
      }), t('Oversubscribed')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        icon: "skull-crossbones"
      }), t('Slashed')]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Badge, {
        color: "red",
        icon: "user-slash"
      }), t('Blocks nominations')]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Legend).withConfig({
  displayName: "Legend",
  componentId: "sc-1acijyn-0"
})(["font-size:0.85rem;padding:1rem 0.5rem;text-align:center;.ui--Badge{margin-right:0.5rem;}span+span{margin-left:1rem;}"]));

exports.default = _default;