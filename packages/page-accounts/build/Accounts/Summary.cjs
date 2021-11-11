"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _translate = require("@axia-js/app-treasury/translate");

var _reactComponents = require("@axia-js/react-components");

var _reactQuery = require("@axia-js/react-query");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  balance,
  className
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.SummaryBox, {
    className: className,
    children: balance && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [balance.total.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total balance'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.total
        })
      }), balance.transferrable.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total transferrable'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.transferrable
        })
      }), balance.locked.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('total locked'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.locked
        })
      }), balance.bonded.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('bonded'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.bonded
        })
      }), balance.redeemable.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('redeemable'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.redeemable
        })
      }), balance.unbonding.gtn(0) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('unbonding'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: balance.unbonding
        })
      })]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(Summary);

exports.default = _default;