// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dropdown, InputAddress, InputNumber, Modal } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BN_HUNDRED as MAX_COMM, isFunction } from '@axia-js/util';
import { useTranslation } from "../../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const COMM_MUL = new BN(1e7);

function Validate({
  className = '',
  controllerId,
  onChange,
  stashId,
  withFocus,
  withSenders
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const [commission, setCommission] = useState(1);
  const [allowNoms, setAllowNoms] = useState(true);
  const blockedOptions = useRef([{
    text: t('Yes, allow nominations'),
    value: true
  }, {
    text: t('No, block all nominations'),
    value: false
  }]);
  useEffect(() => {
    try {
      onChange({
        validateTx: api.tx.staking.validate({
          blocked: !allowNoms,
          commission
        })
      });
    } catch {
      onChange({
        validateTx: null
      });
    }
  }, [api, allowNoms, commission, onChange]);

  const _setCommission = useCallback(value => value && setCommission(value.isZero() ? 1 // small non-zero set to avoid isEmpty
  : value.mul(COMM_MUL)), []);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [withSenders && /*#__PURE__*/_jsxs(Modal.Columns, {
      hint: t('The stash and controller pair. This transaction, managing preferences, will be sent from the controller.'),
      children: [/*#__PURE__*/_jsx(InputAddress, {
        defaultValue: stashId,
        isDisabled: true,
        label: t('stash account')
      }), /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: controllerId,
        isDisabled: true,
        label: t('controller account')
      })]
    }), /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The commission is deducted from all rewards before the remainder is split with nominators.'),
      children: /*#__PURE__*/_jsx(InputNumber, {
        autoFocus: withFocus,
        help: t('The percentage reward (0-100) that should be applied for the validator'),
        isZeroable: true,
        label: t('reward commission percentage'),
        maxValue: MAX_COMM,
        onChange: _setCommission
      })
    }), isFunction(api.tx.staking.kick) && /*#__PURE__*/_jsx(Modal.Columns, {
      hint: t('The validator can block any new nominations. By default it is set to allow all nominations.'),
      children: /*#__PURE__*/_jsx(Dropdown, {
        defaultValue: true,
        help: t('Does this validator allow nominations or is it blocked for all'),
        label: t('allows new nominations'),
        onChange: setAllowNoms,
        options: blockedOptions.current
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Validate);