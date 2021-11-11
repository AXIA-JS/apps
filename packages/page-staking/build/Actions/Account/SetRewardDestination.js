// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo, useState } from 'react';
import { Dropdown, InputAddress, MarkError, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import { createDestCurr } from "../destOptions.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SetRewardDestination({
  controllerId,
  defaultDestination,
  onClose,
  stashId
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [destination, setDestination] = useState(() => (defaultDestination !== null && defaultDestination !== void 0 && defaultDestination.isAccount ? 'Account' : defaultDestination === null || defaultDestination === void 0 ? void 0 : defaultDestination.toString()) || 'Staked');
  const [destAccount, setDestAccount] = useState(() => defaultDestination !== null && defaultDestination !== void 0 && defaultDestination.isAccount ? defaultDestination.asAccount.toString() : null);
  const destBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [destAccount]);
  const options = useMemo(() => createDestCurr(t), [t]);
  const isAccount = destination === 'Account';
  const isDestError = isAccount && destBalance && destBalance.accountId.eq(destAccount) && destBalance.freeBalance.isZero();
  return /*#__PURE__*/_jsxs(Modal, {
    header: t('Bonding Preferences'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The stash and controller pair as linked. This operation will be performed via the controller.'),
        children: [/*#__PURE__*/_jsx(InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        }), /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: controllerId,
          help: t('The controller is the account that is be used to control any nominating or validating actions. I will sign this transaction.'),
          isDisabled: true,
          label: t('controller account')
        })]
      }), /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('All rewards will go towards the selected output destination when a payout is made.'),
        children: [/*#__PURE__*/_jsx(Dropdown, {
          defaultValue: defaultDestination === null || defaultDestination === void 0 ? void 0 : defaultDestination.toString(),
          help: t('The destination account for any payments as either a nominator or validator'),
          label: t('payment destination'),
          onChange: setDestination,
          options: options,
          value: destination
        }), isAccount && /*#__PURE__*/_jsx(InputAddress, {
          help: t('An account that is to receive the rewards'),
          label: t('the payment account'),
          onChange: setDestAccount,
          type: "account",
          value: destAccount
        }), isDestError && /*#__PURE__*/_jsx(MarkError, {
          content: t('The selected destination account does not exist and cannot be used to receive rewards')
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: controllerId,
        icon: "sign-in-alt",
        isDisabled: !controllerId || isAccount && (!destAccount || isDestError),
        label: t('Set reward destination'),
        onStart: onClose,
        params: [isAccount ? {
          Account: destAccount
        } : destination],
        tx: api.tx.staking.setPayee
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SetRewardDestination);