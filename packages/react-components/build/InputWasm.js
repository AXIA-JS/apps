import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
const _excluded = ["onChange"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { compactAddLength, isWasm } from '@axia-js/util';
import InputFile from "./InputFile.js";
import { jsx as _jsx } from "react/jsx-runtime";

function InputWasm(_ref) {
  let {
    onChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const _onChange = useCallback((wasm, name) => {
    const isValid = isWasm(wasm);
    onChange(compactAddLength(wasm), isValid, name);
  }, [onChange]);

  return /*#__PURE__*/_jsx(InputFile, _objectSpread(_objectSpread({}, props), {}, {
    accept: "application/wasm",
    onChange: _onChange
  }));
}

export default /*#__PURE__*/React.memo(InputWasm);