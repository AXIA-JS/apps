// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { AddressSmall, Columar, Expander, Tag, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import DesignAXIALunar from "./DesignAXIALunar.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function renderJSXPayouts(bestNumber, payouts) {
  return payouts.map(([bn, value], index) => /*#__PURE__*/_jsx("div", {
    className: "payout",
    children: /*#__PURE__*/_jsxs(Columar, {
      children: [/*#__PURE__*/_jsx(Columar.Column, {
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: value
        })
      }), /*#__PURE__*/_jsxs(Columar.Column, {
        children: [/*#__PURE__*/_jsxs("div", {
          children: ["#", formatNumber(bn)]
        }), bn.gt(bestNumber) && /*#__PURE__*/_jsx(BlockToTime, {
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
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const renderPayouts = useCallback(() => bestNumber && payouts && renderJSXPayouts(bestNumber, payouts), [bestNumber, payouts]);
  const isMember = useMemo(() => allAccounts.some(a => a === key), [allAccounts, key]);
  const availablePayout = useMemo(() => bestNumber && payouts.find(([b]) => bestNumber.gt(b)), [bestNumber, payouts]);
  const votedOn = useMemo(() => [isCandidateVoter && t('Candidate'), isDefenderVoter && t('Defender')].filter(s => !!s).join(', '), [isCandidateVoter, isDefenderVoter, t]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "all",
      children: [isHead && /*#__PURE__*/_jsx(Tag, {
        color: "green",
        label: t('society head')
      }), isFounder && /*#__PURE__*/_jsx(Tag, {
        color: "green",
        label: t('founder')
      }), isSkeptic && /*#__PURE__*/_jsx(Tag, {
        color: "yellow",
        label: t('skeptic')
      }), (isCandidateVoter || isDefenderVoter) && /*#__PURE__*/_jsx(Tag, {
        color: "blue",
        label: t('voted')
      }), isWarned && /*#__PURE__*/_jsx(Tag, {
        color: "orange",
        label: t('strikes')
      }), isSuspended && /*#__PURE__*/_jsx(Tag, {
        color: "red",
        label: t('suspended')
      }), availablePayout && /*#__PURE__*/_jsx(Tag, {
        color: "grey",
        label: t('payout')
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: !!(payouts !== null && payouts !== void 0 && payouts.length) && /*#__PURE__*/_jsx(Expander, {
        className: "payoutExpander",
        renderChildren: renderPayouts,
        summary: t('Payouts ({{count}})', {
          replace: {
            count: formatNumber(payouts.length)
          }
        })
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "together",
      children: votedOn
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: formatNumber(strikes)
    }), /*#__PURE__*/_jsxs("td", {
      className: "button start",
      children: [/*#__PURE__*/_jsx(DesignAXIALunar, {
        accountId: accountId
      }), availablePayout && /*#__PURE__*/_jsx(TxButton, {
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

export default /*#__PURE__*/React.memo(styled(Member).withConfig({
  displayName: "Member",
  componentId: "sc-a1vdwn-0"
})([".payoutExpander{.payout+.payout{margin-top:0.5rem;}.ui--Columnar{flex-wrap:unset;.ui--Column{min-width:15ch;&:first-child{max-width:100% !important;}&:last-child{min-width:15ch;max-width:15ch;white-space:nowrap;}}}}"]));