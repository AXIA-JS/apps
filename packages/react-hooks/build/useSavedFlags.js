import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useState } from 'react';
import store from 'store';
import { isBoolean } from '@axia-js/util';

function getInitial(storageKey, initial) {
  const saved = store.get(`flags:${storageKey}`, {});
  return Object.keys(initial).reduce((result, key) => {
    if (isBoolean(saved[key])) {
      result[key] = saved[key];
    }

    return result;
  }, _objectSpread({}, initial));
}

function getSetters(flags, setFlags) {
  const setFlag = key => value => setFlags(state => _objectSpread(_objectSpread({}, state), {}, {
    [key]: value
  }));

  return Object.keys(flags).reduce((setters, key) => {
    setters[key] = setFlag(key);
    return setters;
  }, {});
}

export function useSavedFlags(storageKey, initial) {
  const [flags, setFlags] = useState(() => getInitial(storageKey, initial));
  const [setters] = useState(() => getSetters(initial, setFlags));
  useEffect(() => {
    store.set(`flags:${storageKey}`, flags);
  }, [flags, storageKey]);
  return [flags, setters];
}