// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { MarkError, MarkWarning } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_ZERO } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ValidateAmount({
  amount,
  delegatingAccount,
  onError
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const delegatingAccountBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [delegatingAccount]);
  const [{
    error,
    warning
  }, setResult] = useState({
    error: null,
    warning: null
  });
  useEffect(() => {
    if (delegatingAccountBalance !== null && delegatingAccountBalance !== void 0 && delegatingAccountBalance.freeBalance && amount !== null && amount !== void 0 && amount.gt(BN_ZERO)) {
      let newError = null;

      if (amount.gte(delegatingAccountBalance.freeBalance)) {
        newError = t('The maximum amount you can delegate is the amount of funds available on the delegating account.');
      }

      setResult(state => {
        const error = state.error !== newError ? newError : state.error;
        const warning = state.warning;
        onError(error || warning ? {
          error,
          warning
        } : null);
        return {
          error,
          warning
        };
      });
    }
  }, [api, onError, amount, t, delegatingAccountBalance]);

  if (error) {
    return /*#__PURE__*/_jsx(MarkError, {
      content: error
    });
  } else if (warning) {
    return /*#__PURE__*/_jsx(MarkWarning, {
      content: warning
    });
  }

  return null;
}

export default /*#__PURE__*/React.memo(ValidateAmount);