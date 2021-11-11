// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { AddressInfo } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const WITH_BALANCE = {
  available: true,
  bonded: true,
  free: true,
  locked: true,
  reserved: true,
  total: true
};

function Balances({
  address,
  className
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("section", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "ui--AddressMenu-sectionHeader",
      children: t('balance')
    }), /*#__PURE__*/_jsx(AddressInfo, {
      address: address,
      className: "balanceExpander",
      withBalance: WITH_BALANCE,
      withExtended: false,
      withLabel: true
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Balances).withConfig({
  displayName: "Balances",
  componentId: "sc-tkzt3f-0"
})([".balanceExpander{justify-content:flex-start;.column{width:auto;max-width:18.57rem;label{text-align:left;color:inherit;font-size:0.93rem;font-weight:var(--font-weight-normal);}.ui--Expander-content .ui--FormatBalance-value{font-size:0.93rem;}}}"]));