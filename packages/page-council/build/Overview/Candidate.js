// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressSmall, Tag } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Voters from "./Voters.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Candidate({
  address,
  balance,
  className = '',
  isPrime,
  voters
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: address
      })
    }), /*#__PURE__*/_jsx("td", {
      children: isPrime && /*#__PURE__*/_jsx(Tag, {
        color: "green",
        hover: t('Current prime member, default voting'),
        label: t('prime voter')
      })
    }), /*#__PURE__*/_jsx(Voters, {
      balance: balance,
      voters: voters
    })]
  });
}

export default /*#__PURE__*/React.memo(Candidate);