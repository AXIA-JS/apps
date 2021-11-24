// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { Elapsed } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function SummarySession({
  className,
  withEra = true,
  withSession = true
}) {
  var _api$derive$session, _api$query$staking;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const sessionInfo = useCall((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.progress);
  const forcing = useCall((_api$query$staking = api.query.staking) === null || _api$query$staking === void 0 ? void 0 : _api$query$staking.forceEra);
  const eraLabel = t('era');
  const sessionLabel = sessionInfo !== null && sessionInfo !== void 0 && sessionInfo.isEpoch ? t('epoch') : t('session');
  const activeEraStart = sessionInfo === null || sessionInfo === void 0 ? void 0 : sessionInfo.activeEraStart.unwrapOr(null);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: sessionInfo && /*#__PURE__*/_jsxs(_Fragment, {
      children: [withSession && (sessionInfo.sessionLength.gt(BN_ONE) ? /*#__PURE__*/_jsx(CardSummary, {
        className: className,
        label: sessionLabel,
        progress: {
          total: sessionInfo.sessionLength,
          value: sessionInfo.sessionProgress,
          withTime: true
        }
      }) : /*#__PURE__*/_jsxs(CardSummary, {
        label: sessionLabel,
        children: ["#", formatNumber(sessionInfo.currentIndex), withEra && activeEraStart && /*#__PURE__*/_jsx("div", {
          className: "isSecondary",
          children: "\xA0"
        })]
      })), forcing && !forcing.isForceNone && withEra && (sessionInfo.sessionLength.gt(BN_ONE) ? /*#__PURE__*/_jsx(CardSummary, {
        className: className,
        label: eraLabel,
        progress: {
          total: forcing.isForceAlways ? sessionInfo.sessionLength : sessionInfo.eraLength,
          value: forcing.isForceAlways ? sessionInfo.sessionProgress : sessionInfo.eraProgress,
          withTime: true
        }
      }) : /*#__PURE__*/_jsxs(CardSummary, {
        className: className,
        label: eraLabel,
        children: ["#", formatNumber(sessionInfo.activeEra), activeEraStart && /*#__PURE__*/_jsxs(Elapsed, {
          className: "isSecondary",
          value: activeEraStart,
          children: ["\xA0", t('elapsed')]
        })]
      }))]
    })
  });
}

export default /*#__PURE__*/React.memo(SummarySession);