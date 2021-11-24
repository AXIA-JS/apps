import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import BaseBytes from "./BaseBytes.js";
import Static from "./Static.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Unknown(props) {
  const {
    className = '',
    defaultValue,
    isDisabled,
    isError,
    label,
    name,
    onChange,
    onEnter,
    onEscape,
    type
  } = props;

  if (isDisabled) {
    return /*#__PURE__*/_jsx(Static, _objectSpread({}, props));
  }

  return /*#__PURE__*/_jsx(BaseBytes, {
    asHex: true,
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    length: -1,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    type: type,
    withLength: false
  });
}

export default /*#__PURE__*/React.memo(Unknown);