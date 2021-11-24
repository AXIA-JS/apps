"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = valueToText;

var _react = _interopRequireDefault(require("react"));

var _types = require("@axia-js/types");

var _util = require("@axia-js/util");

var _jsxRuntime = require("react/jsx-runtime");

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
function div(_ref) {
  let {
    className = '',
    key
  } = _ref;

  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: `ui--Param-text ${className}`,
    children: values
  }, key);
}

function formatKeys(keys) {
  return JSON.stringify(keys.map(_ref2 => {
    let [validator, keys] = _ref2;
    return [validator.toString(), keys.toHex()];
  }));
}

function toHuman(value) {
  return (0, _util.isFunction)(value.toHuman) ? value.toHuman() : Array.isArray(value) ? value.map(v => toHuman(v)) : value.toString();
}

function toString(value) {
  return JSON.stringify(value, null, 2).replace(/"/g, '').replace(/\\/g, '').replace(/\],\[/g, '],\n[');
}

function valueToText(type, value) {
  let contentShorten = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if ((0, _util.isNull)(value) || (0, _util.isUndefined)(value)) {
    return div({}, '<unknown>');
  }

  return div({}, ['Bytes', 'Raw', 'Option<Keys>', 'Keys'].includes(type) && (0, _util.isFunction)(value.toU8a) ? (0, _util.u8aToHex)(value.toU8a(true), contentShorten ? 512 : -1) // HACK Handle Keys as hex-only (this should go away once the node value is
  // consistently swapped to `Bytes`)
  : type === 'Vec<(ValidatorId,Keys)>' ? toString(formatKeys(value)) : value instanceof _types.Raw ? value.isEmpty ? '<empty>' : value.toString() : value instanceof _types.Option && value.isNone ? '<none>' : toString(toHuman(value)));
}