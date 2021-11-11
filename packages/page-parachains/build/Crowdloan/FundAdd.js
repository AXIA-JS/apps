// Copyright 2017-2021 @axia-js/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Button, InputBalance, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { BN_ONE, BN_ZERO } from '@axia-js/util';
import InputOwner from "../InputOwner.js";
import { useTranslation } from "../translate.js";
import { useLeaseRanges } from "../useLeaseRanges.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_OWNER = {
  accountId: null,
  paraId: 0
};

function FundAdd({
  auctionInfo,
  bestNumber,
  className,
  leasePeriod,
  ownedIds
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const ranges = useLeaseRanges();
  const [{
    accountId,
    paraId
  }, setOwnerInfo] = useState(EMPTY_OWNER);
  const [cap, setCap] = useState();
  const [endBlock, setEndBlock] = useState();
  const [firstSlot, setFirstSlot] = useState();
  const [lastSlot, setLastSlot] = useState();
  const [isOpen, toggleOpen] = useToggle();
  const maxPeriods = ranges[ranges.length - 1][1] - ranges[0][0];
  const isEndError = !bestNumber || !endBlock || endBlock.lt(bestNumber);
  const isFirstError = !firstSlot || !!leasePeriod && firstSlot.lt(leasePeriod.currentPeriod);
  const isLastError = !lastSlot || !firstSlot || lastSlot.lt(firstSlot) || lastSlot.gt(firstSlot.addn(maxPeriods));
  const defaultSlot = ((auctionInfo === null || auctionInfo === void 0 ? void 0 : auctionInfo.leasePeriod) || (leasePeriod === null || leasePeriod === void 0 ? void 0 : leasePeriod.currentPeriod.add(BN_ONE)) || 1).toString(); // TODO Add verifier

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !ownedIds.length,
      label: t('Add fund'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('Add campaign'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsx(InputOwner, {
          onChange: setOwnerInfo,
          ownedIds: ownedIds
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The amount to be raised in this funding campaign.'),
          children: /*#__PURE__*/_jsx(InputBalance, {
            isZeroable: false,
            label: t('crowdfund cap'),
            onChange: setCap
          })
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The end block for contributions to this fund.'),
          children: /*#__PURE__*/_jsx(InputNumber, {
            isError: isEndError,
            label: t('ending block'),
            onChange: setEndBlock
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx("p", {
              children: t('The first and last lease periods for this funding campaign.')
            }), /*#__PURE__*/_jsx("p", {
              children: t('The ending lease period should be after the first and a maximum of {{maxPeriods}} periods more than the first', {
                replace: {
                  maxPeriods
                }
              })
            })]
          }),
          children: [/*#__PURE__*/_jsx(InputNumber, {
            defaultValue: defaultSlot,
            isError: isFirstError,
            label: t('first period'),
            onChange: setFirstSlot
          }), /*#__PURE__*/_jsx(InputNumber, {
            defaultValue: defaultSlot,
            isError: isLastError,
            label: t('last period'),
            onChange: setLastSlot
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: accountId,
          icon: "plus",
          isDisabled: !paraId || !(cap !== null && cap !== void 0 && cap.gt(BN_ZERO)) || isEndError || isFirstError || isLastError,
          label: t('Add'),
          onStart: toggleOpen,
          params: [paraId, cap, firstSlot, lastSlot, endBlock, null],
          tx: api.tx.crowdloan.create
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(FundAdd);