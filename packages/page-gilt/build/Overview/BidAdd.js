// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Button, InputAddress, InputBalance, InputNumber, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useToggle } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { BN_ONE } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function Bid({
  className,
  isDisabled,
  proxies
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [isOpen, toggleOpen] = useToggle();
  const [accountId, setAccountId] = useState(null);
  const [proxyId, setProxyId] = useState(null);
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();
  const tx = useMemo(() => accountId && amount && duration ? api.tx.proxy.proxy(accountId, null, api.tx.gilt.placeBid(amount, duration)) : null, [api, accountId, amount, duration]);
  const proxiedAccounts = Object.keys(proxies);
  const isAmountError = !amount || amount.isZero() || amount.lt(api.consts.gilt.minFreeze);
  const isDurationError = !duration || !duration.gte(BN_ONE) || duration.gt(api.consts.gilt.queueCount);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Button, {
      icon: "plus",
      isDisabled: !proxiedAccounts.length || isDisabled,
      label: t('Submit Bid'),
      onClick: toggleOpen
    }), isOpen && /*#__PURE__*/_jsxs(Modal, {
      className: className,
      header: t('submit gilt bid'),
      onClose: toggleOpen,
      size: "large",
      children: [/*#__PURE__*/_jsxs(Modal.Content, {
        children: [/*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('This account will make the bid for the gilt and pay all associated fees.'),
          children: [/*#__PURE__*/_jsx(InputAddress, {
            filter: proxiedAccounts,
            help: t('The account you want to register the bid from'),
            label: t('use proxied account'),
            labelExtra: /*#__PURE__*/_jsx(Available, {
              label: /*#__PURE__*/_jsx("span", {
                className: "label",
                children: t('transferrable')
              }),
              params: accountId
            }),
            onChange: setAccountId,
            type: "account"
          }), accountId && /*#__PURE__*/_jsx(InputAddress, {
            filter: proxies[accountId],
            help: t('The associated proxy to use for this account'),
            label: t('send via proxy'),
            onChange: setProxyId,
            type: "account"
          })]
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The amount you wish to lock for the duration. It needs to be more than the gilt minimum.'),
          children: [/*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            defaultValue: api.consts.gilt.minFreeze,
            isError: isAmountError,
            isZeroable: false,
            label: t('bid amount'),
            onChange: setAmount
          }), /*#__PURE__*/_jsx(InputBalance, {
            defaultValue: api.consts.gilt.minFreeze,
            help: t('The minimum amount that is allowed as a bid'),
            isDisabled: true,
            label: t('minimum freeze amount')
          })]
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The number of periods this bid is to be freezed for, less than the maximum period'),
          children: [/*#__PURE__*/_jsx(InputNumber, {
            defaultValue: BN_ONE,
            isError: isDurationError,
            isZeroable: false,
            label: t('lock periods'),
            onChange: setDuration
          }), /*#__PURE__*/_jsx(InputNumber, {
            defaultValue: api.consts.gilt.queueCount,
            isDisabled: true,
            label: t('maximum lock periods')
          })]
        })]
      }), /*#__PURE__*/_jsx(Modal.Actions, {
        children: /*#__PURE__*/_jsx(TxButton, {
          accountId: proxyId,
          extrinsic: tx,
          icon: "check",
          isDisabled: isAmountError || isDurationError || !accountId,
          label: t('Bid'),
          onStart: toggleOpen
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(Bid);