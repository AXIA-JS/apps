// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo } from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractEventDetails(events) {
  return events ? events.reduce(([deposits, transfers, weight], {
    record: {
      event: {
        data,
        method,
        section
      }
    }
  }) => [section === 'balances' && method === 'Deposit' ? deposits.iadd(data[1]) : deposits, section === 'balances' && method === 'Transfer' ? transfers.iadd(data[2]) : transfers, section === 'system' && ['ExtrinsicFailed', 'ExtrinsicSuccess'].includes(method) ? weight.iadd((method === 'ExtrinsicSuccess' ? data[0] : data[1]).weight) : weight], [new BN(0), new BN(0), new BN(0)]) : [];
}

function Summary({
  events,
  maxBlockWeight,
  signedBlock
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [deposits, transfers, weight] = useMemo(() => extractEventDetails(events), [events]);

  if (!events || !signedBlock) {
    return null;
  }

  return /*#__PURE__*/_jsxs(SummaryBox, {
    children: [/*#__PURE__*/_jsx("section", {
      children: api.query.balances && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(CardSummary, {
          label: t('deposits'),
          children: /*#__PURE__*/_jsx(FormatBalance, {
            value: deposits
          })
        }), /*#__PURE__*/_jsx(CardSummary, {
          label: t('transfers'),
          children: /*#__PURE__*/_jsx(FormatBalance, {
            value: transfers
          })
        })]
      })
    }), maxBlockWeight && /*#__PURE__*/_jsx("section", {
      children: /*#__PURE__*/_jsx(CardSummary, {
        label: t('block weight'),
        progress: {
          hideValue: true,
          total: maxBlockWeight,
          value: weight
        },
        children: formatNumber(weight)
      })
    }), /*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('event count'),
        children: formatNumber(events.length)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('extrinsic count'),
        children: formatNumber(signedBlock.block.extrinsics.length)
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);