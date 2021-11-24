// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { checkAddress } from '@axia-js/phishing';
import { InputAddress, InputBalance, MarkError, MarkWarning, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { BN_HUNDRED, BN_ZERO, isFunction } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function isRefcount(accountInfo) {
  return !!accountInfo.refcount;
}

async function checkPhishing(_senderId, recipientId) {
  return [// not being checked atm
  // senderId
  //   ? await checkAddress(senderId)
  //   : null,
  null, recipientId ? await checkAddress(recipientId) : null];
}

function Transfer({
  className = '',
  onClose,
  recipientId: propRecipientId,
  senderId: propSenderId
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amount, setAmount] = useState(BN_ZERO);
  const [hasAvailable] = useState(true);
  const [isProtected, setIsProtected] = useState(true);
  const [isAll, setIsAll] = useState(false);
  const [[maxTransfer, noFees], setMaxTransfer] = useState([null, false]);
  const [recipientId, setRecipientId] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [[, recipientPhish], setPhishing] = useState([null, null]);
  const balances = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [propSenderId || senderId]);
  const accountInfo = useCall(api.query.system.account, [propSenderId || senderId]);
  useEffect(() => {
    var _api$rpc$payment;

    const fromId = propSenderId || senderId;
    const toId = propRecipientId || recipientId;

    if (balances && balances.accountId.eq(fromId) && fromId && toId && isFunction((_api$rpc$payment = api.rpc.payment) === null || _api$rpc$payment === void 0 ? void 0 : _api$rpc$payment.queryInfo)) {
      setTimeout(() => {
        try {
          api.tx.balances.transfer(toId, balances.availableBalance).paymentInfo(fromId).then(({
            partialFee
          }) => {
            const adjFee = partialFee.muln(110).div(BN_HUNDRED);
            const maxTransfer = balances.availableBalance.sub(adjFee);
            setMaxTransfer(maxTransfer.gt(api.consts.balances.existentialDeposit) ? [maxTransfer, false] : [null, true]);
          }).catch(console.error);
        } catch (error) {
          console.error(error.message);
        }
      }, 0);
    } else {
      setMaxTransfer([null, false]);
    }
  }, [api, balances, propRecipientId, propSenderId, recipientId, senderId]);
  useEffect(() => {
    checkPhishing(propSenderId || senderId, propRecipientId || recipientId).then(setPhishing).catch(console.error);
  }, [propRecipientId, propSenderId, recipientId, senderId]);
  const noReference = accountInfo ? isRefcount(accountInfo) ? accountInfo.refcount.isZero() : accountInfo.consumers.isZero() : true;
  const canToggleAll = !isProtected && balances && balances.accountId.eq(propSenderId || senderId) && maxTransfer && noReference;
  return /*#__PURE__*/_jsxs(Modal, {
    className: "app--accounts-Modal",
    header: t('Send funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsx(Modal.Content, {
      children: /*#__PURE__*/_jsxs("div", {
        className: className,
        children: [/*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('The transferred balance will be subtracted (along with fees) from the sender account.'),
          children: /*#__PURE__*/_jsx(InputAddress, {
            defaultValue: propSenderId,
            help: t('The account you will send funds from.'),
            isDisabled: !!propSenderId,
            label: t('send from account'),
            labelExtra: /*#__PURE__*/_jsx(Available, {
              label: t('transferrable'),
              params: propSenderId || senderId
            }),
            onChange: setSenderId,
            type: "account"
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('The beneficiary will have access to the transferred fees when the transaction is included in a block.'),
          children: [/*#__PURE__*/_jsx(InputAddress, {
            defaultValue: propRecipientId,
            help: t('Select a contact or paste the address you want to send funds to.'),
            isDisabled: !!propRecipientId,
            label: t('send to address'),
            labelExtra: /*#__PURE__*/_jsx(Available, {
              label: t('transferrable'),
              params: propRecipientId || recipientId
            }),
            onChange: setRecipientId,
            type: "allPlus"
          }), recipientPhish && /*#__PURE__*/_jsx(MarkError, {
            content: t('The recipient is associated with a known phishing site on {{url}}', {
              replace: {
                url: recipientPhish
              }
            })
          })]
        }), /*#__PURE__*/_jsx(Modal.Columns, {
          hint: t('If the recipient account is new, the balance needs to be more than the existential deposit. Likewise if the sending account balance drops below the same value, the account will be removed from the state.'),
          children: canToggleAll && isAll ? /*#__PURE__*/_jsx(InputBalance, {
            autoFocus: true,
            defaultValue: maxTransfer,
            help: t('The full account balance to be transferred, minus the transaction fees'),
            isDisabled: true,
            label: t('transferrable minus fees')
          }, maxTransfer === null || maxTransfer === void 0 ? void 0 : maxTransfer.toString()) : /*#__PURE__*/_jsxs(_Fragment, {
            children: [/*#__PURE__*/_jsx(InputBalance, {
              autoFocus: true,
              help: t('Type the amount you want to transfer. Note that you can select the unit on the right e.g sending 1 milli is equivalent to sending 0.001.'),
              isError: !hasAvailable,
              isZeroable: true,
              label: t('amount'),
              maxValue: maxTransfer,
              onChange: setAmount
            }), /*#__PURE__*/_jsx(InputBalance, {
              defaultValue: api.consts.balances.existentialDeposit,
              help: t('The minimum amount that an account should have to be deemed active'),
              isDisabled: true,
              label: t('existential deposit')
            })]
          })
        }), /*#__PURE__*/_jsxs(Modal.Columns, {
          hint: t('With the keep-alive option set, the account is protected against removal due to low balances.'),
          children: [isFunction(api.tx.balances.transferKeepAlive) && /*#__PURE__*/_jsx(Toggle, {
            className: "typeToggle",
            label: isProtected ? t('Transfer with account keep-alive checks') : t('Normal transfer without keep-alive checks'),
            onChange: setIsProtected,
            value: isProtected
          }), canToggleAll && /*#__PURE__*/_jsx(Toggle, {
            className: "typeToggle",
            label: t('Transfer the full account balance, reap the sender'),
            onChange: setIsAll,
            value: isAll
          }), !isProtected && !noReference && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('There is an existing reference count on the sender account. As such the account cannot be reaped from the state.')
          }), noFees && /*#__PURE__*/_jsx(MarkWarning, {
            content: t('The transaction, after application of the transfer fees, will drop the available balance below the existential deposit. As such the transfer will fail. The account needs more free funds to cover the transaction fees.')
          })]
        })]
      })
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: propSenderId || senderId,
        icon: "paper-plane",
        isDisabled: !hasAvailable || !(propRecipientId || recipientId) || !amount || !!recipientPhish,
        label: t('Make Transfer'),
        onStart: onClose,
        params: canToggleAll && isAll ? [propRecipientId || recipientId, maxTransfer] : [propRecipientId || recipientId, amount],
        tx: isProtected && api.tx.balances.transferKeepAlive || api.tx.balances.transfer
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Transfer).withConfig({
  displayName: "Transfer",
  componentId: "sc-3jj124-0"
})([".balance{margin-bottom:0.5rem;text-align:right;padding-right:1rem;.label{opacity:0.7;}}label.with-help{flex-basis:10rem;}.typeToggle{text-align:right;}.typeToggle+.typeToggle{margin-top:0.375rem;}"]));