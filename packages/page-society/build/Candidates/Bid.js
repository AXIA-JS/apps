// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressSmall, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi } from '@axia-js/react-hooks';
import { FormatBalance } from '@axia-js/react-query';
import { useTranslation } from "../translate.js";
import BidType from "./BidType.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BidRow({
  index,
  value: {
    kind,
    value,
    who
  }
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    allAccounts
  } = useAccounts();
  const isBidder = useMemo(() => {
    const address = who.toString();
    return allAccounts.some(accountId => accountId === address);
  }, [allAccounts, who]);
  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "address all",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: who
      })
    }), /*#__PURE__*/_jsx(BidType, {
      value: kind
    }), /*#__PURE__*/_jsx("td", {
      className: "number",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: value
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "button",
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: who,
        icon: "times",
        isDisabled: !isBidder,
        label: t('Unbid'),
        params: [index],
        tx: api.tx.society.unbid
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BidRow);