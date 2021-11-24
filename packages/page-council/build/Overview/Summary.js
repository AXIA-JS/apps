// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { BN_ZERO, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function Summary({
  bestNumber,
  className = '',
  electionsInfo,
  hasElections
}) {
  const {
    t
  } = useTranslation();

  if (!electionsInfo) {
    return null;
  }

  const {
    candidateCount,
    desiredRunnersUp,
    desiredSeats,
    members,
    runnersUp,
    termDuration,
    voteCount
  } = electionsInfo;
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsxs(CardSummary, {
        label: t('seats'),
        children: [formatNumber(members.length), desiredSeats && /*#__PURE__*/_jsxs(_Fragment, {
          children: ["\xA0/\xA0", formatNumber(desiredSeats)]
        })]
      }), hasElections && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(CardSummary, {
          label: t('runners up'),
          children: [formatNumber(runnersUp.length), desiredRunnersUp && /*#__PURE__*/_jsxs(_Fragment, {
            children: ["\xA0/\xA0", formatNumber(desiredRunnersUp)]
          })]
        }), /*#__PURE__*/_jsx(CardSummary, {
          label: t('candidates'),
          children: formatNumber(candidateCount)
        })]
      })]
    }), voteCount && /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsxs(CardSummary, {
        label: t('voting round'),
        children: ["#", formatNumber(voteCount)]
      })
    }), bestNumber && termDuration && termDuration.gt(BN_ZERO) && /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('term progress'),
        progress: {
          total: termDuration,
          value: bestNumber.mod(termDuration),
          withTime: true
        }
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);