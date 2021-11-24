// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini, ParaLink } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function WinRanges({
  auctionInfo,
  blockNumber,
  className = '',
  isFirst,
  isLatest,
  value: {
    accountId,
    firstSlot,
    isCrowdloan,
    lastSlot,
    paraId,
    value
  }
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      children: isFirst && /*#__PURE__*/_jsx("h1", {
        children: isLatest ? t('latest') : /*#__PURE__*/_jsxs(_Fragment, {
          children: ["#", formatNumber(!blockNumber || blockNumber.isZero() ? auctionInfo.endBlock : blockNumber)]
        })
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(paraId)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "badge",
      children: /*#__PURE__*/_jsx(ParaLink, {
        id: paraId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressMini, {
        value: accountId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "all number",
      children: isCrowdloan ? t('Yes') : t('No')
    }), /*#__PURE__*/_jsx("td", {
      className: "all number together",
      children: firstSlot.eq(lastSlot) ? formatNumber(firstSlot) : `${formatNumber(firstSlot)} - ${formatNumber(lastSlot)}`
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: value
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(WinRanges);