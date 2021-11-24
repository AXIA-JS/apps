// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Option, Raw } from '@axia-js/types';
import { isFunction, isNull, isUndefined, u8aToHex } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";

function div({
  className = '',
  key
}, ...values) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Param-text ${className}`,
    children: values
  }, key);
}

function formatKeys(keys) {
  return JSON.stringify(keys.map(([validator, keys]) => [validator.toString(), keys.toHex()]));
}

function toHuman(value) {
  return isFunction(value.toHuman) ? value.toHuman() : Array.isArray(value) ? value.map(v => toHuman(v)) : value.toString();
}

function toString(value) {
  return JSON.stringify(value, null, 2).replace(/"/g, '').replace(/\\/g, '').replace(/\],\[/g, '],\n[');
}

export default function valueToText(type, value, contentShorten = true) {
  if (isNull(value) || isUndefined(value)) {
    return div({}, '<unknown>');
  }

  return div({}, ['Bytes', 'Raw', 'Option<Keys>', 'Keys'].includes(type) && isFunction(value.toU8a) ? u8aToHex(value.toU8a(true), contentShorten ? 512 : -1) // HACK Handle Keys as hex-only (this should go away once the node value is
  // consistently swapped to `Bytes`)
  : type === 'Vec<(ValidatorId,Keys)>' ? toString(formatKeys(value)) : value instanceof Raw ? value.isEmpty ? '<empty>' : value.toString() : value instanceof Option && value.isNone ? '<none>' : toString(toHuman(value)));
}