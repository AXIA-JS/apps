// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { AddressMini, AddressSmall, Badge, Checkbox, Expander } from '@axia-js/react-components';
import { FormatBalance } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Row({
  index,
  isSelected,
  onSelect,
  slash: {
    isMine,
    slash: {
      others,
      own,
      payout,
      reporters,
      validator
    },
    total,
    totalOther
  }
}) {
  const {
    t
  } = useTranslation();

  const _onSelect = useCallback(() => onSelect && onSelect(index), [index, onSelect]);

  return /*#__PURE__*/_jsxs("tr", {
    children: [/*#__PURE__*/_jsx("td", {
      className: "badge",
      children: isMine && /*#__PURE__*/_jsx(Badge, {
        color: "red",
        icon: "skull-crossbones"
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: validator
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "expand all",
      children: !!others.length && /*#__PURE__*/_jsx(Expander, {
        summary: t('Nominators ({{count}})', {
          replace: {
            count: formatNumber(others.length)
          }
        }),
        children: others.map(([accountId, balance], index) => /*#__PURE__*/_jsx(AddressMini, {
          balance: balance,
          value: accountId,
          withBalance: true
        }, index))
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address",
      children: reporters.map((reporter, index) => /*#__PURE__*/_jsx(AddressMini, {
        value: reporter
      }, index))
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: own
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: totalOther
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: total
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "number together",
      children: /*#__PURE__*/_jsx(FormatBalance, {
        value: payout
      })
    }), /*#__PURE__*/_jsx("td", {
      children: /*#__PURE__*/_jsx(Checkbox, {
        isDisabled: !onSelect,
        onChange: _onSelect,
        value: isSelected
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Row);