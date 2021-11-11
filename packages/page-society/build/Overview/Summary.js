// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { useTranslation } from "../translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Summary({
  className = '',
  info,
  payoutTotal
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const members = useCall(api.derive.society.members);
  const bestNumber = useBestNumber();
  const pot = useMemo(() => info && info.pot.gtn(0) ? info.pot : null, [info]);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsx("section", {
      className: "media--1100",
      children: info && members && /*#__PURE__*/_jsxs(CardSummary, {
        label: t('members'),
        children: [members.length, "\xA0/\xA0", info.maxMembers.toString()]
      })
    }), bestNumber && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("section", {
        children: /*#__PURE__*/_jsx(CardSummary, {
          label: t('rotation'),
          progress: {
            total: api.consts.society.rotationPeriod,
            value: bestNumber.mod(api.consts.society.rotationPeriod),
            withTime: true
          }
        })
      }), /*#__PURE__*/_jsx("section", {
        className: "media--1200",
        children: /*#__PURE__*/_jsx(CardSummary, {
          label: t('challenge'),
          progress: {
            total: api.consts.society.challengePeriod,
            value: bestNumber.mod(api.consts.society.challengePeriod),
            withTime: true
          }
        })
      })]
    }), /*#__PURE__*/_jsxs("section", {
      children: [payoutTotal && /*#__PURE__*/_jsx(CardSummary, {
        label: t('payouts'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: payoutTotal,
          withSi: true
        })
      }), pot && /*#__PURE__*/_jsx(CardSummary, {
        label: t('pot'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: pot,
          withSi: true
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Summary).withConfig({
  displayName: "Summary",
  componentId: "sc-h3z8n6-0"
})([".society--header--account{white-space:nowrap;.ui--AccountName{display:inline-block;}.ui--IdentityIcon{margin-right:0.5rem;}}"]));