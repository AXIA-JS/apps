// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dropdown, InputAddress, InputBalance, MarkError, Modal, Static } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BalanceFree, BlockToTime } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import InputValidateAmount from "../Account/InputValidateAmount.js";
import InputValidationController from "../Account/InputValidationController.js";
import { createDestCurr } from "../destOptions.js";
import useUnbondDuration from "../useUnbondDuration.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_INFO = {
  bondOwnTx: null,
  bondTx: null,
  controllerId: null,
  controllerTx: null,
  stashId: null
};

function Bond({
  className = '',
  isNominating,
  minNominated,
  minNominatorBond,
  minValidatorBond,
  onChange
}) {
  var _api$derive$balances, _api$derive$balances2;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amount, setAmount] = useState();
  const [amountError, setAmountError] = useState(null);
  const [controllerError, setControllerError] = useState(false);
  const [controllerId, setControllerId] = useState(null);
  const [destination, setDestination] = useState('Staked');
  const [destAccount, setDestAccount] = useState(null);
  const [stashId, setStashId] = useState(null);
  const [startBalance, setStartBalance] = useState(null);
  const stashBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const destBalance = useCall((_api$derive$balances2 = api.derive.balances) === null || _api$derive$balances2 === void 0 ? void 0 : _api$derive$balances2.all, [destAccount]);
  const bondedBlocks = useUnbondDuration();
  const options = useMemo(() => createDestCurr(t), [t]);

  const _setError = useCallback((_, isFatal) => setControllerError(isFatal), []);

  useEffect(() => {
    stashBalance && setStartBalance(stashBalance.freeBalance.gt(api.consts.balances.existentialDeposit) ? stashBalance.freeBalance.sub(api.consts.balances.existentialDeposit) : BN_ZERO);
  }, [api, stashBalance]);
  useEffect(() => {
    setStartBalance(null);
  }, [stashId]);
  useEffect(() => {
    const bondDest = destination === 'Account' ? {
      Account: destAccount
    } : destination;
    onChange(amount && amount.gtn(0) && !(amountError !== null && amountError !== void 0 && amountError.error) && !controllerError && controllerId && stashId ? {
      bondOwnTx: api.tx.staking.bond(stashId, amount, bondDest),
      bondTx: api.tx.staking.bond(controllerId, amount, bondDest),
      controllerId,
      controllerTx: api.tx.staking.setController(controllerId),
      stashId
    } : EMPTY_INFO);
  }, [api, amount, amountError, controllerError, controllerId, destination, destAccount, stashId, onChange]);
  const hasValue = !!(amount !== null && amount !== void 0 && amount.gtn(0));
  const isAccount = destination === 'Account';
  const isDestError = isAccount && destBalance && destBalance.accountId.eq(destAccount) && destBalance.freeBalance.isZero();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsxs(Modal.Columns, {
      hint: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("p", {
          children: t('Think of the stash as your cold wallet and the controller as your hot wallet. Funding operations are controlled by the stash, any other non-funding actions by the controller itself.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('To ensure optimal fund security using the same stash/controller is strongly discouraged, but not forbidden.')
        })]
      }),
      children: [/*#__PURE__*/_jsx(InputAddress, {
        label: t('stash account'),
        onChange: setStashId,
        type: "account",
        value: stashId
      }), /*#__PURE__*/_jsx(InputAddress, {
        help: t('The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.'),
        label: t('controller account'),
        onChange: setControllerId,
        type: "account",
        value: controllerId
      }), /*#__PURE__*/_jsx(InputValidationController, {
        accountId: stashId,
        controllerId: controllerId,
        onError: _setError
      })]
    }), startBalance && /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("p", {
          children: t('The amount placed at-stake should not be your full available available amount to allow for transaction fees.')
        }), /*#__PURE__*/_jsx("p", {
          children: t('Once bonded, it will need to be unlocked/withdrawn and will be locked for at least the bonding duration.')
        })]
      }),
      children: [/*#__PURE__*/_jsx(InputBalance, {
        autoFocus: true,
        defaultValue: startBalance,
        help: t('The total amount of the stash balance that will be at stake in any forthcoming rounds (should be less than the free amount available)'),
        isError: !hasValue || !!(amountError !== null && amountError !== void 0 && amountError.error),
        label: t('value bonded'),
        labelExtra: /*#__PURE__*/_jsx(BalanceFree, {
          label: /*#__PURE__*/_jsx("span", {
            className: "label",
            children: t('balance')
          }),
          params: stashId
        }),
        onChange: setAmount
      }), /*#__PURE__*/_jsx(InputValidateAmount, {
        controllerId: controllerId,
        isNominating: isNominating,
        minNominated: minNominated,
        minNominatorBond: minNominatorBond,
        minValidatorBond: minValidatorBond,
        onError: setAmountError,
        stashId: stashId,
        value: amount
      }), (bondedBlocks === null || bondedBlocks === void 0 ? void 0 : bondedBlocks.gtn(0)) && /*#__PURE__*/_jsx(Static, {
        help: t('The bonding duration for any staked funds. Needs to be unlocked and withdrawn to become available.'),
        label: t('on-chain bonding duration'),
        children: /*#__PURE__*/_jsx(BlockToTime, {
          value: bondedBlocks
        })
      })]
    }), /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: t('Rewards (once paid) can be deposited to either the stash or controller, with different effects.'),
      children: [/*#__PURE__*/_jsx(Dropdown, {
        defaultValue: 0,
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
  });
}

export default /*#__PURE__*/React.memo(Bond);