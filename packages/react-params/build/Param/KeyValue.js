// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '@axia-js/react-components';
import { compactAddLength, hexToU8a, u8aConcat } from '@axia-js/util';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// eslint-disable-next-line @typescript-eslint/ban-types
export function createParam(hex, length = -1) {
  let u8a;

  try {
    u8a = hexToU8a(hex.toString());
  } catch (error) {
    u8a = new Uint8Array([]);
  }

  const isValid = length !== -1 ? u8a.length === length : u8a.length !== 0;
  return {
    isValid,
    u8a: compactAddLength(u8a)
  };
}

function KeyValue({
  className = '',
  isDisabled,
  label,
  onChange,
  onEnter,
  withLabel
}) {
  const [, setIsValid] = useState(false);
  const [key, setKey] = useState({
    isValid: false,
    u8a: new Uint8Array([])
  });
  const [value, setValue] = useState({
    isValid: false,
    u8a: new Uint8Array([])
  });
  useEffect(() => {
    const isValid = key.isValid && value.isValid;
    onChange && onChange({
      isValid,
      value: u8aConcat(key.u8a, value.u8a)
    });
    setIsValid(isValid);
  }, [key, onChange, value]);

  const _onChangeKey = useCallback(key => setKey(createParam(key)), []);

  const _onChangeValue = useCallback(value => setValue(createParam(value)), []);

  return /*#__PURE__*/_jsxs(Bare, {
    className: className,
    children: [/*#__PURE__*/_jsx(Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !key.isValid,
      label: label,
      onChange: _onChangeKey,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    }), /*#__PURE__*/_jsx(Input, {
      className: "medium",
      isDisabled: isDisabled,
      isError: !value.isValid,
      onChange: _onChangeValue,
      onEnter: onEnter,
      placeholder: "0x...",
      type: "text",
      withLabel: withLabel
    })]
  });
}

export default /*#__PURE__*/React.memo(KeyValue);