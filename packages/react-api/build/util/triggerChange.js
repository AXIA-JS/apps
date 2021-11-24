// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { isFunction, isObservable } from '@axia-js/util';
export default function triggerChange(value, ...callOnResult) {
  if (!callOnResult || !callOnResult.length) {
    return;
  }

  callOnResult.forEach(callOnResult => {
    if (isObservable(callOnResult)) {
      callOnResult.next(value);
    } else if (isFunction(callOnResult)) {
      callOnResult(value);
    }
  });
}