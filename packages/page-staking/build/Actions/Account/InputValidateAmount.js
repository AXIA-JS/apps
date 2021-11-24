// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useEffect, useState } from 'react';
import { MarkError, MarkWarning } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { BN_TEN, BN_THOUSAND, BN_ZERO, formatBalance } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function formatExistential(value) {
  let fmt = (value.mul(BN_THOUSAND).div(BN_TEN.pow(new BN(formatBalance.getDefaults().decimals))).toNumber() / 1000).toFixed(3);

  while (fmt.length !== 1 && ['.', '0'].includes(fmt[fmt.length - 1])) {
    const isLast = fmt.endsWith('.');
    fmt = fmt.substr(0, fmt.length - 1);

    if (isLast) {
      break;
    }
  }

  return fmt;
}

function ValidateAmount({
  currentAmount,
  isNominating,
  minNominated,
  minNominatorBond,
  minValidatorBond,
  onError,
  stashId,
  value
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const stashBalance = useCall((_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all, [stashId]);
  const [{
    error,
    warning
  }, setResult] = useState({
    error: null,
    warning: null
  });
  useEffect(() => {
    if (stashBalance && value) {
      // also used in bond extra, take check against total of current bonded and new
      const check = value.add(currentAmount || BN_ZERO);
      const existentialDeposit = api.consts.balances.existentialDeposit;
      const maxBond = stashBalance.freeBalance.sub(existentialDeposit.divn(2));
      let newError = null;
      let newWarning = null;

      if (check.gte(maxBond)) {
        newError = t('The specified value is too large and does not allow funds to pay future transaction fees.');
      } else if (check.lt(existentialDeposit)) {
        newError = t('The bonded amount is less than the minimum bond amount of {{existentialDeposit}}', {
          replace: {
            existentialDeposit: formatExistential(existentialDeposit)
          }
        });
      } else if (isNominating) {
        if (minNominatorBond && check.lt(minNominatorBond)) {
          newError = t('The bonded amount is less than the minimum threshold of {{minBond}} for nominators', {
            replace: {
              minBond: formatBalance(minNominatorBond)
            }
          });
        } else if (minNominated && check.lt(minNominated)) {
          newWarning = t('The bonded amount is less than the current active minimum nominated amount of {{minNomination}} and depending on the network state, may not be selected to participate', {
            replace: {
              minNomination: formatBalance(minNominated)
            }
          });
        }
      } else {
        if (minValidatorBond && check.lt(minValidatorBond)) {
          newError = t('The bonded amount is less than the minimum threshold of {{minBond}} for validators', {
            replace: {
              minBond: formatBalance(minValidatorBond)
            }
          });
        }
      }

      setResult(state => {
        const error = state.error !== newError ? newError : state.error;
        const warning = state.warning !== newWarning ? newWarning : state.warning;
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
  }, [api, currentAmount, isNominating, minNominated, minNominatorBond, minValidatorBond, onError, stashBalance, t, value]);

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