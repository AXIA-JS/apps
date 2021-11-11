import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Expander, InputAddress, InputBalance, Modal, Toggle, TxButton } from '@axia-js/react-components';
import { useAccountId, useDebounce, useFormField, useToggle } from '@axia-js/react-hooks';
import { Available } from '@axia-js/react-query';
import { BN_ONE, BN_ZERO } from '@axia-js/util';
import { InputMegaGas, Params } from "../shared/index.js";
import { useTranslation } from "../translate.js";
import useWeight from "../useWeight.js";
import Outcome from "./Outcome.js";
import { getCallMessageOptions } from "./util.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const MAX_CALL_WEIGHT = new BN(5000000000000).isub(BN_ONE);

function Call({
  className = '',
  contract,
  messageIndex,
  onCallResult,
  onChangeMessage,
  onClose
}) {
  const {
    t
  } = useTranslation();
  const message = contract.abi.messages[messageIndex];
  const [accountId, setAccountId] = useAccountId();
  const [estimatedWeight, setEstimatedWeight] = useState(null);
  const [value, isValueValid, setEndowment] = useFormField(BN_ZERO);
  const [outcomes, setOutcomes] = useState([]);
  const [execTx, setExecTx] = useState(null);
  const [params, setParams] = useState([]);
  const [isViaCall, toggleViaCall] = useToggle();
  const weight = useWeight();
  const dbValue = useDebounce(value);
  const dbParams = useDebounce(params);
  useEffect(() => {
    setEstimatedWeight(null);
    setParams([]);
  }, [contract, messageIndex]);
  useEffect(() => {
    value && message.isMutating && setExecTx(() => {
      try {
        return contract.tx[message.method]({
          gasLimit: weight.weight,
          value: message.isPayable ? value : 0
        }, ...params);
      } catch (error) {
        return null;
      }
    });
  }, [accountId, contract, message, value, weight, params]);
  useEffect(() => {
    if (!accountId || !message || !dbParams || !dbValue) return;
    contract.query[message.method](accountId, {
      gasLimit: -1,
      value: message.isPayable ? dbValue : 0
    }, ...dbParams).then(({
      gasRequired,
      result
    }) => setEstimatedWeight(result.isOk ? gasRequired : null)).catch(() => setEstimatedWeight(null));
  }, [accountId, contract, message, dbParams, dbValue]);

  const _onSubmitRpc = useCallback(() => {
    if (!accountId || !message || !value || !weight) return;
    contract.query[message.method](accountId, {
      gasLimit: weight.isEmpty ? -1 : weight.weight,
      value: message.isPayable ? value : 0
    }, ...params).then(result => {
      setOutcomes([_objectSpread(_objectSpread({}, result), {}, {
        from: accountId,
        message,
        params,
        when: new Date()
      }), ...outcomes]);
      onCallResult && onCallResult(messageIndex, result);
    }).catch(error => {
      console.error(error);
      onCallResult && onCallResult(messageIndex);
    });
  }, [accountId, contract, message, messageIndex, onCallResult, outcomes, params, value, weight]);

  const _onClearOutcome = useCallback(outcomeIndex => () => setOutcomes([...outcomes.filter((_, index) => index !== outcomeIndex)]), [outcomes]);

  const isValid = !!(accountId && weight.isValid && isValueValid);
  const isViaRpc = contract.hasRpcContractsCall && (isViaCall || !message.isMutating && !message.isPayable);
  return /*#__PURE__*/_jsxs(Modal, {
    className: [className || '', 'app--contracts-Modal'].join(' '),
    header: t('Call a contract'),
    onClose: onClose,
    children: [/*#__PURE__*/_jsxs(Modal.Content, {
      children: [/*#__PURE__*/_jsx(InputAddress, {
        help: t('A deployed contract that has either been deployed or attached. The address and ABI are used to construct the parameters.'),
        isDisabled: true,
        label: t('contract to use'),
        type: "contract",
        value: contract.address
      }), /*#__PURE__*/_jsx(InputAddress, {
        defaultValue: accountId,
        help: t('Specify the user account to use for this contract call. And fees will be deducted from this account.'),
        label: t('call from account'),
        labelExtra: /*#__PURE__*/_jsx(Available, {
          label: t('transferrable'),
          params: accountId
        }),
        onChange: setAccountId,
        type: "account",
        value: accountId
      }), messageIndex !== null && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Dropdown, {
          defaultValue: messageIndex,
          help: t('The message to send to this contract. Parameters are adjusted based on the ABI provided.'),
          isError: message === null,
          label: t('message to send'),
          onChange: onChangeMessage,
          options: getCallMessageOptions(contract),
          value: messageIndex
        }), /*#__PURE__*/_jsx(Params, {
          onChange: setParams,
          params: message ? message.args : undefined,
          registry: contract.abi.registry
        })]
      }), message.isPayable && /*#__PURE__*/_jsx(InputBalance, {
        help: t('The allotted value for this contract, i.e. the amount transferred to the contract as part of this call.'),
        isError: !isValueValid,
        isZeroable: true,
        label: t('value'),
        onChange: setEndowment,
        value: value
      }), /*#__PURE__*/_jsx(InputMegaGas, {
        estimatedWeight: message.isMutating ? estimatedWeight : MAX_CALL_WEIGHT,
        help: t('The maximum amount of gas to use for this contract call. If the call requires more, it will fail.'),
        isCall: !message.isMutating,
        weight: weight
      }), message.isMutating && /*#__PURE__*/_jsx(Toggle, {
        className: "rpc-toggle",
        label: t('read contract only, no execution'),
        onChange: toggleViaCall,
        value: isViaCall
      }), outcomes.length > 0 && /*#__PURE__*/_jsx(Expander, {
        className: "outcomes",
        isOpen: true,
        summary: t('Call results'),
        children: outcomes.map((outcome, index) => /*#__PURE__*/_jsx(Outcome, {
          onClear: _onClearOutcome(index),
          outcome: outcome
        }, `outcome-${index}`))
      })]
    }), /*#__PURE__*/_jsx(Modal.Actions, {
      children: isViaRpc ? /*#__PURE__*/_jsx(Button, {
        icon: "sign-in-alt",
        isDisabled: !isValid,
        label: t('Read'),
        onClick: _onSubmitRpc
      }) : /*#__PURE__*/_jsx(TxButton, {
        accountId: accountId,
        extrinsic: execTx,
        icon: "sign-in-alt",
        isDisabled: !isValid || !execTx,
        label: t('Execute'),
        onStart: onClose
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Call).withConfig({
  displayName: "Call",
  componentId: "sc-1b0aupg-0"
})([".rpc-toggle{margin-top:1rem;display:flex;justify-content:flex-end;}.clear-all{float:right;}.outcomes{margin-top:1rem;}"]));