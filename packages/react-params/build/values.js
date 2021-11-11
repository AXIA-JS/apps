// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isUndefined } from '@axia-js/util';
import getInitValue from "./initValue.js";
export function createValue(registry, param) {
  const value = getInitValue(registry, param.type);
  return {
    isValid: !isUndefined(value),
    value
  };
}
export default function createValues(registry, params) {
  return params.map(param => createValue(registry, param));
}