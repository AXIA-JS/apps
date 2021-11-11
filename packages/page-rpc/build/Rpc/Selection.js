// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo, useState } from 'react';
import { Button, InputRpc } from '@axia-js/react-components';
import Params from '@axia-js/react-params';
import { getTypeDef } from '@axia-js/types/create';
import jsonrpc from '@axia-js/types/interfaces/jsonrpc';
import { isNull } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const defaultMethod = jsonrpc.author.submitExtrinsic;

function Selection({
  queueRpc
}) {
  const {
    t
  } = useTranslation();
  const [{
    isValid,
    rpc,
    values
  }, setState] = useState({
    isValid: false,
    rpc: defaultMethod,
    values: []
  });
  const params = useMemo(() => rpc.params.map(({
    isOptional,
    name,
    type
  }) => ({
    name,
    type: getTypeDef(isOptional ? `Option<${type}>` : type)
  })), [rpc]);

  const _nextState = useCallback(newState => setState(prevState => {
    const {
      rpc = prevState.rpc,
      values = prevState.values
    } = newState;
    const reqCount = rpc.params.reduce((count, {
      isOptional
    }) => count + (isOptional ? 0 : 1), 0);
    const isValid = values.reduce((isValid, value) => isValid && value.isValid === true, reqCount <= values.length);
    return {
      isValid,
      rpc,
      values
    };
  }), []);

  const _onChangeMethod = useCallback(rpc => _nextState({
    rpc,
    values: []
  }), [_nextState]);

  const _onChangeValues = useCallback(values => _nextState({
    values
  }), [_nextState]);

  const _onSubmit = useCallback(() => queueRpc({
    rpc,
    values: values.filter(({
      value
    }) => !isNull(value)).map(({
      value
    }) => value)
  }), [queueRpc, rpc, values]);

  return /*#__PURE__*/_jsxs("section", {
    className: "rpc--Selection",
    children: [/*#__PURE__*/_jsx(InputRpc, {
      defaultValue: defaultMethod,
      help: t('The actual JSONRPC module and function to make a call to.'),
      label: t('call the selected endpoint'),
      onChange: _onChangeMethod
    }), /*#__PURE__*/_jsx(Params, {
      onChange: _onChangeValues,
      params: params
    }, `${rpc.section}.${rpc.method}:params`
    /* force re-render on change */
    ), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Button, {
        icon: "sign-in-alt",
        isDisabled: !isValid,
        label: t('Submit RPC call'),
        onClick: _onSubmit
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(Selection);