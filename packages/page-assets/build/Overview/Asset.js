// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import Mint from "./Mint/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Asset({
  className,
  value: {
    details,
    id,
    isIssuerMe,
    metadata
  }
}) {
  const format = useMemo(() => metadata ? [metadata.decimals.toNumber(), metadata.symbol.toUtf8()] : [0, '---'], [metadata]);
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h1", {
        children: formatNumber(id)
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "together",
      children: metadata === null || metadata === void 0 ? void 0 : metadata.name.toUtf8()
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1000",
      children: details && /*#__PURE__*/_jsx(AddressSmall, {
        value: details.owner
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1200",
      children: details && /*#__PURE__*/_jsx(AddressSmall, {
        value: details.admin
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1300",
      children: details && /*#__PURE__*/_jsx(AddressSmall, {
        value: details.issuer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1400",
      children: details && /*#__PURE__*/_jsx(AddressSmall, {
        value: details.freezer
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number all",
      children: details && /*#__PURE__*/_jsx(FormatBalance, {
        format: format,
        value: details.supply
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: details && metadata && isIssuerMe && /*#__PURE__*/_jsx(Mint, {
        details: details,
        id: id,
        metadata: metadata
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Asset);