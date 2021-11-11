// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressMini, Expander } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Voters({
  balance,
  voters
}) {
  if (!balance || !voters || !voters.length) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("td", {
        className: "all number"
      }), /*#__PURE__*/_jsx("td", {
        className: "number"
      })]
    });
  }

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("td", {
      className: "all expand",
      children: /*#__PURE__*/_jsx(Expander, {
        summary: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance
        }),
        children: voters.map(who => /*#__PURE__*/_jsx(AddressMini, {
          value: who,
          withLockedVote: true
        }, who.toString()))
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: formatNumber(voters.length)
    })]
  });
}

export default /*#__PURE__*/React.memo(Voters);