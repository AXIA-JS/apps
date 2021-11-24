// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Link } from 'react-router-dom';
import { AddressMini, Digits } from '@axia-js/react-components';
import { formatNumber } from '@axia-js/util'; // TODO update HeaderExtended in api-derive

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BlockHeader({
  value
}) {
  if (!value) {
    return null;
  }

  const hashHex = value.hash.toHex();
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx("h2", {
        children: /*#__PURE__*/_jsx(Link, {
          to: `/explorer/query/${hashHex}`,
          children: /*#__PURE__*/_jsx(Digits, {
            value: formatNumber(value.number)
          })
        })
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "all hash overflow",
      children: hashHex
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: value.authorFromMapping ? /*#__PURE__*/_jsx(AddressMini, {
        value: value.authorFromMapping
      }) : value.author && /*#__PURE__*/_jsx(AddressMini, {
        value: value.author
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BlockHeader);