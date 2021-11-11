"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _translate = require("../translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function Summary({
  className = '',
  info,
  payoutTotal
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const members = (0, _reactHooks.useCall)(api.derive.society.members);
  const bestNumber = (0, _reactHooks.useBestNumber)();
  const pot = (0, _react.useMemo)(() => info && info.pot.gtn(0) ? info.pot : null, [info]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.SummaryBox, {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
      className: "media--1100",
      children: info && members && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: t('members'),
        children: [members.length, "\xA0/\xA0", info.maxMembers.toString()]
      })
    }), bestNumber && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('rotation'),
          progress: {
            total: api.consts.society.rotationPeriod,
            value: bestNumber.mod(api.consts.society.rotationPeriod),
            withTime: true
          }
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("section", {
        className: "media--1200",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
          label: t('challenge'),
          progress: {
            total: api.consts.society.challengePeriod,
            value: bestNumber.mod(api.consts.society.challengePeriod),
            withTime: true
          }
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("section", {
      children: [payoutTotal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('payouts'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: payoutTotal,
          withSi: true
        })
      }), pot && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        label: t('pot'),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: pot,
          withSi: true
        })
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Summary).withConfig({
  displayName: "Summary",
  componentId: "sc-h3z8n6-0"
})([".society--header--account{white-space:nowrap;.ui--AccountName{display:inline-block;}.ui--IdentityIcon{margin-right:0.5rem;}}"]));

exports.default = _default;