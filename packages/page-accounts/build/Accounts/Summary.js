// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useTranslation } from '@axia-js/app-treasury/translate';
import { CardSummary, SummaryBox } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Summary({
  balance,
  className
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(SummaryBox, {
    className: className,
    children: balance && /*#__PURE__*/_jsxs(_Fragment, {
      children: [balance.total.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('total balance'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.total
        })
      }), balance.transferrable.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('total transferrable'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.transferrable
        })
      }), balance.locked.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('total locked'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.locked
        })
      }), balance.bonded.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('bonded'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.bonded
        })
      }), balance.redeemable.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('redeemable'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.redeemable
        })
      }), balance.unbonding.gtn(0) && /*#__PURE__*/_jsx(CardSummary, {
        label: t('unbonding'),
        children: /*#__PURE__*/_jsx(FormatBalance, {
          value: balance.unbonding
        })
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(Summary);