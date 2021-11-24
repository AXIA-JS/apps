// Copyright 2017-2021 @axia-js/app-treasury authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AddressMini, AddressSmall, Checkbox, Expander, Icon, LinkExternal, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi } from '@axia-js/react-hooks';
import { BlockToTime, FormatBalance } from '@axia-js/react-query';
import { BN_ZERO, formatNumber } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import TipEndorse from "./TipEndorse.js";
import TipReason from "./TipReason.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function isCurrentTip(tip) {
  return !!(tip !== null && tip !== void 0 && tip.findersFee);
}

function extractTipState(tip, allAccounts) {
  const closesAt = tip.closes.unwrapOr(null);
  let finder = null;
  let deposit = null;

  if (isCurrentTip(tip)) {
    finder = tip.finder;
    deposit = tip.deposit;
  } else if (tip.finder.isSome) {
    const finderInfo = tip.finder.unwrap();
    finder = finderInfo[0];
    deposit = finderInfo[1];
  }

  const values = tip.tips.map(([, value]) => value).sort((a, b) => a.cmp(b));
  const midIndex = Math.floor(values.length / 2);
  const median = values.length ? values.length % 2 ? values[midIndex] : values[midIndex - 1].add(values[midIndex]).divn(2) : BN_ZERO;
  return {
    closesAt,
    deposit,
    finder,
    isFinder: !!finder && allAccounts.includes(finder.toString()),
    isTipped: !!values.length,
    isTipper: tip.tips.some(([address]) => allAccounts.includes(address.toString())),
    median
  };
}

function Tip({
  bestNumber,
  className = '',
  defaultId,
  hash,
  isMember,
  members,
  onSelect,
  onlyUntipped,
  tip
}) {
  const {
    api
  } = useApi();
  const {
    t
  } = useTranslation();
  const {
    allAccounts
  } = useAccounts();
  const {
    closesAt,
    finder,
    isFinder,
    isTipped,
    isTipper,
    median
  } = useMemo(() => extractTipState(tip, allAccounts), [allAccounts, tip]);
  const councilId = useMemo(() => allAccounts.find(accountId => members.includes(accountId)) || null, [allAccounts, members]);
  const [isMedianSelected, setMedianTip] = useState(false);
  useEffect(() => {
    onSelect(hash, isMedianSelected, median);
  }, [hash, isMedianSelected, median, onSelect]);
  useEffect(() => {
    setMedianTip(isMember && !isTipper);
  }, [isMember, isTipper]);

  if (onlyUntipped && !closesAt && isTipper) {
    return null;
  }

  const {
    reason,
    tips,
    who
  } = tip;
  return /*#__PURE__*/_jsxs("tr", {
    className: className,
    children: [/*#__PURE__*/_jsx("td", {
      className: "address",
      children: /*#__PURE__*/_jsx(AddressSmall, {
        value: who
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "address media--1400",
      children: finder && /*#__PURE__*/_jsx(AddressMini, {
        value: finder
      })
    }), /*#__PURE__*/_jsx(TipReason, {
      hash: reason
    }), /*#__PURE__*/_jsx("td", {
      className: "expand media--1100",
      children: tips.length !== 0 && /*#__PURE__*/_jsx(Expander, {
        summary: /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx("div", {
            children: t('Tippers ({{count}})', {
              replace: {
                count: tips.length
              }
            })
          }), /*#__PURE__*/_jsx(FormatBalance, {
            value: median
          })]
        }),
        children: tips.map(([tipper, balance]) => /*#__PURE__*/_jsx(AddressMini, {
          balance: balance,
          value: tipper,
          withBalance: true
        }, tipper.toString()))
      })
    }), /*#__PURE__*/_jsxs("td", {
      className: "button together",
      children: [closesAt ? bestNumber && closesAt.gt(bestNumber) && /*#__PURE__*/_jsxs("div", {
        className: "closingTimer",
        children: [/*#__PURE__*/_jsx(BlockToTime, {
          value: closesAt.sub(bestNumber)
        }), "#", formatNumber(closesAt)]
      }) : finder && isFinder && /*#__PURE__*/_jsx(TxButton, {
        accountId: finder,
        className: "media--1400",
        icon: "times",
        label: t('Cancel'),
        params: [hash],
        tx: (api.tx.tips || api.tx.treasury).retractTip
      }), !closesAt || !bestNumber || closesAt.gt(bestNumber) ? /*#__PURE__*/_jsx(TipEndorse, {
        defaultId: defaultId,
        hash: hash,
        isMember: isMember,
        isTipped: isTipped,
        median: median,
        members: members
      }) : /*#__PURE__*/_jsx(TxButton, {
        accountId: councilId,
        icon: "times",
        label: t('Close'),
        params: [hash],
        tx: (api.tx.tips || api.tx.treasury).closeTip
      })]
    }), /*#__PURE__*/_jsx("td", {
      className: "badge media--1700",
      children: isMember && /*#__PURE__*/_jsx(Icon, {
        color: isTipper ? 'green' : 'gray',
        icon: "asterisk"
      })
    }), /*#__PURE__*/_jsx("td", {
      children: /*#__PURE__*/_jsx(Checkbox, {
        isDisabled: !isMember,
        onChange: setMedianTip,
        value: isMedianSelected
      })
    }), /*#__PURE__*/_jsx("td", {
      className: "links media--1700",
      children: /*#__PURE__*/_jsx(LinkExternal, {
        data: hash,
        isLogo: true,
        type: "tip"
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Tip).withConfig({
  displayName: "Tip",
  componentId: "sc-1uewwyn-0"
})([".closingTimer{display:inline-block;padding:0 0.5rem;}"]));