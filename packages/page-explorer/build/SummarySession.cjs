"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactComponents = require("@axia-js/react-components");

var _reactHooks = require("@axia-js/react-hooks");

var _reactQuery = require("@axia-js/react-query");

var _util = require("@axia-js/util");

var _translate = require("./translate.cjs");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
function SummarySession({
  className,
  withEra = true,
  withSession = true
}) {
  var _api$derive$session, _api$query$staking;

  const {
    t
  } = (0, _translate.useTranslation)();
  const {
    api
  } = (0, _reactHooks.useApi)();
  const sessionInfo = (0, _reactHooks.useCall)((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.progress);
  const forcing = (0, _reactHooks.useCall)((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.forceEra);
  const eraLabel = t('era');
  const sessionLabel = sessionInfo !== null && sessionInfo !== void 0 && sessionInfo.isEpoch ? t('epoch') : t('session');
  const activeEraStart = sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.activeEraStart.unwrapOr(null);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: sessionInfo && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [withSession && (sessionInfo.sessionLength.gt(_util.BN_ONE) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: className,
        label: sessionLabel,
        progress: {
          total: sessionInfo.sessionLength,
          value: sessionInfo.sessionProgress,
          withTime: true
        }
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        label: sessionLabel,
        children: ["#", (0, _util.formatNumber)(sessionInfo.currentIndex), withEra && activeEraStart && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "isSecondary",
          children: "\xA0"
        })]
      })), forcing && !forcing.isForceNone && withEra && (sessionInfo.sessionLength.gt(_util.BN_ONE) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactComponents.CardSummary, {
        className: className,
        label: eraLabel,
        progress: {
          total: forcing.isForceAlways ? sessionInfo.sessionLength : sessionInfo.eraLength,
          value: forcing.isForceAlways ? sessionInfo.sessionProgress : sessionInfo.eraProgress,
          withTime: true
        }
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactComponents.CardSummary, {
        className: className,
        label: eraLabel,
        children: ["#", (0, _util.formatNumber)(sessionInfo.activeEra), activeEraStart && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactQuery.Elapsed, {
          className: "isSecondary",
          value: activeEraStart,
          children: ["\xA0", t('elapsed')]
        })]
      }))]
    })
  });
}

var _default = /*#__PURE__*/_react.default.memo(SummarySession);

exports.default = _default;