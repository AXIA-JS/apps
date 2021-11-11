import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BalanceVoting } from '@axia-js/react-query';
import { BN_ZERO } from '@axia-js/util';
import InputBalance from "./InputBalance.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function getValues(selectedId, isCouncil, allBalances, existential) {
  const value = allBalances.lockedBalance;
  const maxValue = allBalances.votingBalance.add(isCouncil ? allBalances.reservedBalance : BN_ZERO);
  return {
    maxValue,
    selectedId,
    value: value.isZero() ? maxValue.gt(existential) ? maxValue.sub(existential) : BN_ZERO : value
  };
}

function VoteValue({
  accountId,
  autoFocus,
  isCouncil,
  onChange
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const allBalances = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [accountId]);
  const [{
    maxValue,
    selectedId,
    value
  }, setValue] = useState({
    maxValue: BN_ZERO,
    value: BN_ZERO
  });
  useEffect(() => {
    // if the set accountId changes and the new balances is for that id, set it
    allBalances && allBalances.accountId.eq(accountId) && setValue(state => state.selectedId !== accountId ? getValues(accountId, isCouncil, allBalances, api.consts.balances.existentialDeposit) : state);
  }, [allBalances, accountId, api, isCouncil]); // only do onChange to parent when the BN value comes in, not our formatted version

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  const _setValue = useCallback(value => setValue(state => state.selectedId === accountId && value && !value.eq(state.value) ? _objectSpread(_objectSpread({}, state), {}, {
    value
  }) : state), [accountId]);

  const isDisabled = accountId !== selectedId;
  return /*#__PURE__*/_jsx(InputBalance, {
    autoFocus: autoFocus,
    defaultValue: isDisabled ? undefined : value,
    help: t('The amount that is associated with this vote. This value is is locked for the duration of the vote.'),
    isDisabled: isDisabled,
    isZeroable: true,
    label: t('vote value'),
    labelExtra: /*#__PURE__*/_jsx(BalanceVoting, {
      isCouncil: isCouncil,
      label: /*#__PURE__*/_jsx("label", {
        children: t('voting balance')
      }),
      params: accountId
    }),
    maxValue: maxValue,
    onChange: _setValue
  });
}

export default /*#__PURE__*/React.memo(VoteValue);