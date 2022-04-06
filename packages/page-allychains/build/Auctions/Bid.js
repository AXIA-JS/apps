// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, Dropdown, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useAccounts, useApi, useBestNumber, useToggle } from '@axia-js/react-hooks';
import { BN_ZERO, formatNumber } from '@axia-js/util';
import InputOwner from "../InputOwner.js";
import { useTranslation } from "../translate.js";
import { useLeaseRanges } from "../useLeaseRanges.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_OWNER = {
  accountId: null,
  allyId: 0
};

function Bid({
  auctionInfo,
  className,
  lastWinners,
  ownedIds
}) {
  var _auctionInfo$leasePer, _auctionInfo$leasePer2;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    hasAccounts
  } = useAccounts();
  const bestNumber = useBestNumber();
  const ranges = useLeaseRanges();
  const [{
    accountId,
    allyId
  }, setOwnerInfo] = useState(EMPTY_OWNER);
  const [amount, setAmount] = useState(BN_ZERO);
  const [range, setRange] = useState(0);
  const [isOpen, toggleOpen] = useToggle();
  const rangeOpts = useMemo(() => {
    if (!(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod)) {
      return [];
    }

    const leasePeriod = auctionInfo.leasePeriod.toNumber();
    return ranges.map(([first, last], value) => ({
      firstSlot: leasePeriod + first,
      lastSlot: leasePeriod + last,
      text: `${formatNumber(leasePeriod + first)} - ${formatNumber(leasePeriod + last)}`,
      value
    }));
  }, [auctionInfo, ranges]);
  const currentWinner = useMemo(() => lastWinners && lastWinners.winners.find(({
    firstSlot,
    lastSlot
  }) => firstSlot.eqn(rangeOpts[range].firstSlot) && lastSlot.eqn(rangeOpts[range].lastSlot)), [lastWinners, range, rangeOpts]);
  const isAmountLess = !!(amount && currentWinner) && amount.lte(currentWinner.value);
  const isAmountError = !amount || amount.isZero() || isAmountLess;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !ownedIds.length || !hasAccounts || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.numAuctions) || !auctionInfo.leasePeriod || !auctionInfo.endBlock || !api.consts.auctions || (bestNumber === null || bestNumber === void 0 ? void 0 : bestNumber.gte(auctionInfo.endBlock.add(api.consts.auctions.endingPeriod))),
      label: t('Bid'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Place bid'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(InputOwner, {
          onChange: setOwnerInfo,
          ownedIds: ownedIds
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The first and last lease period for this bid. The last lease period should be after the first with the maximum determined by the auction config.'),
          children: /*#__PURE__*/_jsx(Dropdown, {
            label: t('bid period range (first lease - last lease)'),
            onChange: setRange,
            options: rangeOpts,
            value: range
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The amount to to bid for this allychain lease period range.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('The bid should be more than the current range winner to be accepted and influence the auction outcome.')
            })]
          }),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            isError: isAmountError,
            isZeroable: false,
            label: t('bid amount'),
            onChange: setAmount
          }), /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: currentWinner === null || currentWinner === void 0 ? void 0 : currentWinner.value,
            isDisabled: true,
            label: t('current range winning bid')
          }, range)]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !allyId || isAmountError || !(auctionInfo !== null && auctionInfo !== void 0 && auctionInfo.leasePeriod),
          label: t('Bid'),
          onStart: toggleOpen,
          params: [allyId, auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.numAuctions, auctionInfo === null || auctionInfo === void 0 ? void 0 : (_auctionInfo$leasePer = auctionInfo.leasePeriod) === null || _auctionInfo$leasePer === void 0 ? void 0 : _auctionInfo$leasePer.addn(ranges[range][0]), auctionInfo === null || auctionInfo === void 0 ? void 0 : (_auctionInfo$leasePer2 = auctionInfo.leasePeriod) === null || _auctionInfo$leasePer2 === void 0 ? void 0 : _auctionInfo$leasePer2.addn(ranges[range][1]), amount],
          tx: api.tx.auctions.bid
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Bid);