// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { MarkError, MarkWarning } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
const transformBonded = {
  transform: value => value.isSome ? value.unwrap().toString() : null
};
const transformStash = {
  transform: value => value.isSome ? value.unwrap().stash.toString() : null
};

function ValidateController({
  accountId,
  controllerId,
  defaultController,
  onError
}) {
  var _api$derive$balances;

  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const bondedId = useCall(controllerId ? api.query.staking.bonded : null, [controllerId], transformBonded);
  const stashId = useCall(controllerId ? api.query.staking.ledger : null, [controllerId], transformStash);
  const allBalances = useCall(controllerId ? (_api$derive$balances = api.derive.balances) === null || _api$derive$balances === void 0 ? void 0 : _api$derive$balances.all : null, [controllerId]);
  const [{
    error,
    isFatal
  }, setError] = useState({
    error: null,
    isFatal: false
  });
  useEffect(() => {
    // don't show an error if the selected controller is the default
    // this applies when changing controller
    if (defaultController !== controllerId) {
      let newError = null;
      let isFatal = false;

      if (bondedId && controllerId !== accountId) {
        isFatal = true;
        newError = t('A controller account should not map to another stash. This selected controller is a stash, controlled by {{bondedId}}', {
          replace: {
            bondedId
          }
        });
      } else if (stashId) {
        isFatal = true;
        newError = t('A controller account should not be set to manage multiple stashes. The selected controller is already controlling {{stashId}}', {
          replace: {
            stashId
          }
        });
      } else if (allBalances !== null && allBalances !== void 0 && allBalances.freeBalance.isZero()) {
        isFatal = true;
        newError = t('The controller does not have sufficient funds available to cover transaction fees. Ensure that a funded controller is used.');
      } else if (controllerId === accountId) {
        newError = t('Distinct stash and controller accounts are recommended to ensure fund security. You will be allowed to make the transaction, but take care to not tie up all funds, only use a portion of the available funds during this period.');
      }

      onError(newError, isFatal);
      setError(state => state.error !== newError ? {
        error: newError,
        isFatal
      } : state);
    }
  }, [accountId, allBalances, bondedId, controllerId, defaultController, onError, stashId, t]);

  if (!error || !accountId) {
    return null;
  }

  return isFatal ? /*#__PURE__*/_jsx(MarkError, {
    content: error
  }) : /*#__PURE__*/_jsx(MarkWarning, {
    content: error
  });
}

export default /*#__PURE__*/React.memo(ValidateController);