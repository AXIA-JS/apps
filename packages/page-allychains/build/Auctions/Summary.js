// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { useApi, useBestNumber, useCall } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { BN_ONE, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Summary({
  auctionInfo,
  className,
  lastWinners
}) {
  var _api$query$balances, _api$consts$auctions;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bestNumber = useBestNumber();
  const totalIssuance = useCall((_api$query$balances = api.query.balances) === null || _api$query$balances === void 0 ? void 0 : _api$query$balances.totalIssuance);
  return /*#__PURE__*/_jsxs(SummaryBox, {
    className: className,
    children: [/*#__PURE__*/_jsxs("section", {
      children: [/*#__PURE__*/_jsx(CardSummary, {
        label: t('auctions'),
        children: formatNumber(auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.numAuctions)
      }), /*#__PURE__*/_jsx(CardSummary, {
        label: t('active'),
        children: auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod ? t('yes') : t('no')
      })]
    }), auctionInfo && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs("section", {
        children: [auctionInfo.leasePeriod && /*#__PURE__*/_jsxs(CardSummary, {
          label: t('first - last'),
          children: [formatNumber(auctionInfo.leasePeriod), " - ", formatNumber(auctionInfo.leasePeriod.add(api.consts.auctions.leasePeriodsPerSlot).isub(BN_ONE))]
        }), totalIssuance && lastWinners && /*#__PURE__*/_jsx(CardSummary, {
          label: t('total'),
          progress: {
            hideValue: true,
            total: totalIssuance,
            value: lastWinners.total,
            withTime: true
          },
          children: /*#__PURE__*/_jsx(FormatBalance, {
            value: lastWinners.total,
            withSi: true
          })
        })]
      }), /*#__PURE__*/_jsx("section", {
        children: (auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.endBlock) && bestNumber && (bestNumber.lt(auctionInfo.endBlock) ? /*#__PURE__*/_jsxs(CardSummary, {
          label: t('end period at'),
          progress: {
            hideGraph: true,
            total: auctionInfo.endBlock,
            value: bestNumber,
            withTime: true
          },
          children: ["#", formatNumber(auctionInfo.endBlock)]
        }) : /*#__PURE__*/_jsx(CardSummary, {
          label: t('ending period'),
          progress: {
            total: (_api$consts$auctions = api.consts.auctions) === null || _api$consts$auctions === void 0 ? void 0 : _api$consts$auctions.endingPeriod,
            value: bestNumber.sub(auctionInfo.endBlock),
            withTime: true
          }
        }))
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Summary);