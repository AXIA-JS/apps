// Copyright 2017-2021 @axia-js/react-api authors & contributors
// SPDX-License-Identifier: Apache-2.0
function flatten(key, value) {
  return !value ? value : value.$$typeof ? '' : Array.isArray(value) ? value.map(item => flatten(null, item)) : value;
}

export default function isEqual(a, b) {
  return JSON.stringify({
    test: a
  }, flatten) === JSON.stringify({
    test: b
  }, flatten);
}