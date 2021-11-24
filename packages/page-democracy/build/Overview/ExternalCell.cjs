"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactParams = require("@axia-js/react-params");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
function ExternalCell(_ref) {
  let {
    className = '',
    value
  } = _ref;
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const preimage = (0, _reactHooks.useCall)(api.derive.democracy.preimage, [value]);

  if (!(preimage !== null && preimage !== void 0 && preimage.proposal)) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactParams.Holder, {
    className: className,
    withBorder: true,
    withPadding: true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CallExpander, {
      labelHash: t('proposal hash'),
      value: preimage.proposal,
      withHash: true
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(ExternalCell);

exports.default = _default;