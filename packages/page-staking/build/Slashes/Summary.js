// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Header({
  slash: {
    era,
    nominators,
    reporters,
    total,
    validators
  }
}) {
  var _api$derive$session;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const sessionInfo = useCall((_api$derive$session = api.derive.session) === null || _api$derive$session === void 0 ? void 0 : _api$derive$session.progress);
  const [blockProgress, blockEnd] = useMemo(() => sessionInfo ? [sessionInfo.activeEra.sub(era).isub(BN_ONE).imul(sessionInfo.eraLength).iadd(sessionInfo.eraProgress), api.consts.staking.slashDeferDuration.mul(sessionInfo.eraLength)] : [new BN(0), new BN(0)], [api, era, sessionInfo]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('validators'),
        children: formatNumber(validators.length)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('nominators'),
        children: formatNumber(nominators.length)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('reporters'),
        children: formatNumber(reporters.length)
      })]
    }), blockProgress.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
      label: t('defer'),
      progress: {
        total: blockEnd,
        value: blockProgress,
        withTime: true
      }
    }), /*#__PURE__*/_jsx(CardSummary, {
      label: t('total'),
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: total
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Header);