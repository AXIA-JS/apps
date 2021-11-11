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

var _util = require("@axia-js/util");

var _translate = require("../translate.cjs");

var _DesignAXIALunar = _interopRequireDefault(require("./DesignAXIALunar.cjs"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
function renderJSXPayouts(bestNumber, payouts) {
  return payouts.map(([bn, value], index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "payout",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Columar.Column, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.FormatBalance, {
          value: value
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.Columar.Column, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["#", (0, _util.formatNumber)(bn)]
        }), bn.gt(bestNumber) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.BlockToTime, {
          value: bn.sub(bestNumber)
        }, index)]
      })]
    })
  }, index));
}

function Member({
  bestNumber,
  className = '',
  value: {
    accountId,
    isCandidateVoter,
    isDefenderVoter,
    isFounder,
    isHead,
    isSkeptic,
    isSuspended,
    isWarned,
    key,
    payouts,
    strikes
  }
}) {
  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const {
    allAccounts
  } = (0, _reactHooks.useAccounts)();
  const renderPayouts = (0, _react.useCallback)(() => bestNumber && payouts && renderJSXPayouts(bestNumber, payouts), [bestNumber, payouts]);
  const isMember = (0, _react.useMemo)(() => allAccounts.some(a => a === key), [allAccounts, key]);
  const availablePayout = (0, _react.useMemo)(() => bestNumber && payouts.find(([b]) => bestNumber.gt(b)), [bestNumber, payouts]);
  const votedOn = (0, _react.useMemo)(() => [isCandidateVoter && t('Candidate'), isDefenderVoter && t('Defender')].filter(s => !!s).join(', '), [isCandidateVoter, isDefenderVoter, t]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "address",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "all",
      children: [isHead && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "green",
        label: t('society head')
      }), isFounder && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "green",
        label: t('founder')
      }), isSkeptic && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "yellow",
        label: t('skeptic')
      }), (isCandidateVoter || isDefenderVoter) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "blue",
        label: t('voted')
      }), isWarned && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "orange",
        label: t('strikes')
      }), isSuspended && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "red",
        label: t('suspended')
      }), availablePayout && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Tag, {
        color: "grey",
        label: t('payout')
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number together",
      children: !!(payouts !== null && payouts !== void 0 && payouts.length) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.Expander, {
        className: "payoutExpander",
        renderChildren: renderPayouts,
        summary: t('Payouts ({{count}})', {
          replace: {
            count: (0, _util.formatNumber)(payouts.length)
          }
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "together",
      children: votedOn
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "number",
      children: (0, _util.formatNumber)(strikes)
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("td", {
      className: "button start",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DesignAXIALunar.default, {
        accountId: accountId
      }), availablePayout && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.TxButton, {
        accountId: accountId,
        icon: "ellipsis-h",
        isDisabled: !isMember,
        label: "Payout",
        params: [],
        tx: api.tx.society.payout
      })]
    })]
  });
}

var _default = /*#__PURE__*/_react.default.memo((0, _styledComponents.default)(Member).withConfig({
  displayName: "Member",
  componentId: "sc-a1vdwn-0"
})([".payoutExpander{.payout+.payout{margin-top:0.5rem;}.ui--Columnar{flex-wrap:unset;.ui--Column{min-width:15ch;&:first-child{max-width:100% !important;}&:last-child{min-width:15ch;max-width:15ch;white-space:nowrap;}}}}"]));

exports.default = _default;