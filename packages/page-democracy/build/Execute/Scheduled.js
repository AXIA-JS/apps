// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CallExpander } from '@axia-js/react-components';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Scheduled({
  bestNumber,
  className = '',
  value: {
    blockNumber,
    call,
    maybeId,
    maybePeriodic
  }
}) {
  const period = maybePeriodic.unwrapOr(null);
  const name = maybeId.unwrapOr(null);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "all",
      children: /*#__PURE__*/_jsx(CallExpander, {
        value: call
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: name && (name.isAscii ? name.toUtf8() : name.toHex())
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: bestNumber && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(BlockToTime, {
          value: blockNumber.sub(bestNumber)
        }), "#", formatNumber(blockNumber)]
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: period && formatNumber(period[0])
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: period && formatNumber(period[1])
    })]
  });
}

export default /*#__PURE__*/React.memo(Scheduled);