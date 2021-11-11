// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { useTranslation } from "../translate.js";
import Transfer from "./Transfer.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Account({
  accountId,
  assetId,
  balance: {
    balance,
    isFrozen,
    isSufficient
  },
  className,
  minBalance,
  siFormat
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: accountId
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: isFrozen.isTrue ? t('Yes') : t('No')
    }), /*#__PURE__*/_jsx("td", {
      className: "start",
      children: isSufficient.isTrue ? t('Yes') : t('No')
    }), /*#__PURE__*/_jsx("td", {
      className: "number all",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        format: siFormat,
        value: balance
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsx(Transfer, {
        accountId: accountId,
        assetId: assetId,
        minBalance: minBalance,
        siFormat: siFormat
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Account);