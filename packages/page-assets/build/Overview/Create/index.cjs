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

var _Create = _interopRequireDefault(require("./Create.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
function CreateButton(_ref) {
  let {
    assetIds,
    className,
    openId
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    hasAccounts
  } = (0, _reactHooks.useAccounts)();
  const [isOpen, toggleOpen] = (0, _reactHooks.useToggle)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Button, {
      icon: "plus",
      isDisabled: !assetIds || !hasAccounts,
      label: t('Create'),
      onClick: toggleOpen
    }), isOpen && assetIds && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Create.default, {
      assetIds: assetIds,
      className: className,
      onClose: toggleOpen,
      openId: openId
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(CreateButton);

exports.default = _default;