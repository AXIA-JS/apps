import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
import { Abi } from '@axia-js/api-contract';
import { api } from '@axia-js/react-api';
import { u8aToString } from '@axia-js/util';
import store from "./store.js";

function fromInitial(initialValue, isRequired) {
  return {
    abi: initialValue[0] || null,
    abiName: null,
    contractAbi: initialValue[1] || null,
    errorText: null,
    isAbiError: false,
    isAbiSupplied: !!initialValue[1],
    isAbiValid: !isRequired || !!initialValue[1]
  };
}

const EMPTY = {
  abi: null,
  abiName: null,
  contractAbi: null,
  errorText: null,
  isAbiError: false,
  isAbiSupplied: false,
  isAbiValid: false
};
export default function useAbi(initialValue = [null, null], codeHash = null, isRequired = false) {
  const [state, setAbi] = useState(() => fromInitial(initialValue, isRequired));
  useEffect(() => setAbi(state => initialValue[0] && state.abi !== initialValue[0] ? fromInitial(initialValue, isRequired) : state), [initialValue, isRequired]);
  const onChangeAbi = useCallback((u8a, name) => {
    const json = u8aToString(u8a);

    try {
      setAbi({
        abi: json,
        abiName: name.replace('.contract', '').replace('.json', '').replace('_', ' '),
        contractAbi: new Abi(json, api.registry.getChainProperties()),
        errorText: null,
        isAbiError: false,
        isAbiSupplied: true,
        isAbiValid: true
      });
      codeHash && store.saveCode(codeHash, {
        abi: json
      });
    } catch (error) {
      console.error(error);
      setAbi(_objectSpread(_objectSpread({}, EMPTY), {}, {
        errorText: error.message
      }));
    }
  }, [codeHash]);
  const onRemoveAbi = useCallback(() => {
    setAbi(EMPTY);
    codeHash && store.saveCode(codeHash, {
      abi: null
    });
  }, [codeHash]);
  return _objectSpread(_objectSpread({}, state), {}, {
    onChangeAbi,
    onRemoveAbi
  });
}