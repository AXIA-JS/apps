"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _translate = require("../../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SenderInfo({
  className = '',
  controllerId,
  stashId
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Modal.Columns, {
    className: className,
    hint: t('The stash that is to be affected. The transaction will be sent from the associated controller account.'),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
      defaultValue: stashId,
      isDisabled: true,
      label: t('stash account')
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.InputAddress, {
      defaultValue: controllerId,
      isDisabled: true,
      label: t('controller account')
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo(SenderInfo);

exports.default = _default;