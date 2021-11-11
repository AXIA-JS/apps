// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import SummarySession from '@axia-js/app-explorer/SummarySession';
import { CardSummary, Spinner, SummaryBox } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Summary({
  className = '',
  isVisible,
  stakingOverview,
  targets: {
    counterForNominators,
    inflation: {
      idealStake,
      inflation,
      stakedFraction
    },
    nominators,
    waitingIds
  }
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: `${className}${!isVisible ? ' staking--hidden' : ''}`,
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('validators'),
        children: stakingOverview ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [formatNumber(stakingOverview.validators.length), "\xA0/\xA0", formatNumber(stakingOverview.validatorCount)]
        }) : /*#__PURE__*/_jsx(Spinner, {
          noLabel: true
        })
      }), /*#__PURE__*/_jsx(CardSummary, {
        className: "media--900",
        label: t('waiting'),
        children: waitingIds ? formatNumber(waitingIds.length) : /*#__PURE__*/_jsx(Spinner, {
          noLabel: true
        })
      }), /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1000",
        label: counterForNominators ? t('active / nominators') : t('nominators'),
        children: nominators ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [formatNumber(nominators.length), counterForNominators && /*#__PURE__*/_jsxs(_Fragment, {
            children: ["\xA0/\xA0", formatNumber(counterForNominators)]
          })]
        }) : /*#__PURE__*/_jsx(Spinner, {
          noLabel: true
        })
      })]
    }), /*#__PURE__*/_jsxs("section", {
      children: [idealStake > 0 && Number.isFinite(idealStake) && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1400",
        label: t('ideal staked'),
        children: /*#__PURE__*/_jsxs(_Fragment, {
          children: [(idealStake * 100).toFixed(1), "%"]
        })
      }), stakedFraction > 0 && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1300",
        label: t('staked'),
        children: /*#__PURE__*/_jsxs(_Fragment, {
          children: [(stakedFraction * 100).toFixed(1), "%"]
        })
      }), inflation > 0 && Number.isFinite(inflation) && /*#__PURE__*/_jsx(CardSummary, {
        className: "media--1200",
        label: t('inflation'),
        children: /*#__PURE__*/_jsxs(_Fragment, {
          children: [inflation.toFixed(1), "%"]
        })
      })]
    }), /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(SummarySession, {})
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Summary).withConfig({
  displayName: "Summary",
  componentId: "sc-7ige7d-0"
})([".validator--Account-block-icon{display:inline-block;margin-right:0.75rem;margin-top:-0.25rem;vertical-align:middle;}.validator--Summary-authors{.validator--Account-block-icon+.validator--Account-block-icon{margin-left:-1.5rem;}}"]));