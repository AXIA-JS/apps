// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useMemo, useState } from 'react';
import { InputAddress, InputBalance, Modal, TxButton } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BalanceFree } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import ValidateAmount from "./InputValidateAmount.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function calcBalance(api, stakingInfo, stashBalance) {
  if (stakingInfo && stakingInfo.stakingLedger && stashBalance) {
    var _stakingInfo$stakingL;

    const sumUnlocking = (stakingInfo.unlocking || []).reduce((acc, {
      value
    }) => acc.iadd(value), new BN(0));
    const redeemable = stakingInfo.redeemable || BN_ZERO;
    const available = stashBalance.freeBalance.sub(((_stakingInfo$stakingL = stakingInfo.stakingLedger.active) === null || _stakingInfo$stakingL === void 0 ? void 0 : _stakingInfo$stakingL.unwrap()) || BN_ZERO).sub(sumUnlocking).sub(redeemable);
    return available.gt(api.consts.balances.existentialDeposit) ? available.sub(api.consts.balances.existentialDeposit) : BN_ZERO;
  }

  return null;
}

function BondExtra({
  controllerId,
  onClose,
  stakingInfo,
  stashId
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [amountError, setAmountError] = useState(null);
  const [maxAdditional, setMaxAdditional] = useState();
  const stashBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const currentAmount = useMemo(() => {
    var _stakingInfo$stakingL2, _stakingInfo$stakingL3;

    return stakingInfo && ((_stakingInfo$stakingL2 = stakingInfo.stakingLedger) === null || _stakingInfo$stakingL2 === void 0 ? void 0 : (_stakingInfo$stakingL3 = _stakingInfo$stakingL2.active) === null || _stakingInfo$stakingL3 === void 0 ? void 0 : _stakingInfo$stakingL3.unwrap());
  }, [stakingInfo]);
  const startBalance = useMemo(() => calcBalance(api, stakingInfo, stashBalance), [api, stakingInfo, stashBalance]);
  return /*#__PURE__*/_jsxs(Modal, {
    className: "staking--BondExtra",
    header: t('Bond more funds'),
    onClose: onClose,
    size: "large",
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(Modal.Columns, {
        hint: t('Since this transaction deals with funding, the stash account will be used.'),
        children: /*#__PURE__*/_jsx(InputAddress, {
          defaultValue: stashId,
          isDisabled: true,
          label: t('stash account')
        })
      }), startBalance && /*#__PURE__*/_jsxs(Modal.Columns, {
        hint: t('The amount placed at-stake should allow some free funds for future transactions.'),
        children: [/*#__PURE__*/_jsx(InputBalance, {
          autoFocus: true,
          defaultValue: startBalance,
          help: t('Amount to add to the currently bonded funds. This is adjusted using the available funds on the account.'),
          isError: !!(amountError !== null && amountError !== void 0 && amountError.error) || !maxAdditional || maxAdditional.eqn(0),
          label: t('additional bonded funds'),
          labelExtra: /*#__PURE__*/_jsx(BalanceFree, {
            label: /*#__PURE__*/_jsx("span", {
              className: "label",
              children: t('balance')
            }),
            params: stashId
          }),
          onChange: setMaxAdditional
        }), /*#__PURE__*/_jsx(ValidateAmount, {
          controllerId: controllerId,
          currentAmount: currentAmount,
          onError: setAmountError,
          stashId: stashId,
          value: maxAdditional
        })]
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: /*#__PURE__*/_jsx(TxButton, {
        accountId: stashId,
        icon: "sign-in-alt",
        isDisabled: !(maxAdditional !== null && maxAdditional !== void 0 && maxAdditional.gt(BN_ZERO)) || !!(amountError !== null && amountError !== void 0 && amountError.error),
        label: t('Bond more'),
        onStart: onClose,
        params: [maxAdditional],
        tx: api.tx.staking.bondExtra
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BondExtra);