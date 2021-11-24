// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { CopyButton, Input } from '@axia-js/react-components';
import { compactAddLength, hexToU8a, isAscii, isHex, isU8a, stringToU8a, u8aToHex, u8aToString } from '@axia-js/util';
import { decodeAddress } from '@axia-js/util-crypto';
import { useTranslation } from "../translate.js";
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const defaultValidate = () => true;

function convertInput(value) {
  if (value === '0x') {
    return [true, new Uint8Array([])];
  } else if (value.startsWith('0x')) {
    try {
      return [true, hexToU8a(value)];
    } catch (error) {
      return [false, new Uint8Array([])];
    }
  } // maybe it is an ss58?


  try {
    return [true, decodeAddress(value)];
  } catch (error) {// we continue
  }

  return isAscii(value) ? [true, stringToU8a(value)] : [value === '0x', new Uint8Array([])];
}

function BaseBytes({
  asHex,
  children,
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  length = -1,
  onChange,
  onEnter,
  onEscape,
  size = 'full',
  validate = defaultValidate,
  withCopy,
  withLabel,
  withLength
}) {
  const {
    t
  } = useTranslation();
  const [defaultValue] = useState(value ? isDisabled && isU8a(value) && isAscii(value) ? u8aToString(value) : isHex(value) ? value : u8aToHex(value, isDisabled ? 256 : -1) : undefined);
  const [isValid, setIsValid] = useState(false);

  const _onChange = useCallback(hex => {
    let [isValid, value] = convertInput(hex);
    isValid = isValid && validate(value) && (length !== -1 ? value.length === length : value.length !== 0 || hex === '0x');

    if (withLength && isValid) {
      value = compactAddLength(value);
    }

    onChange && onChange({
      isValid,
      value: asHex ? u8aToHex(value) : value
    });
    setIsValid(isValid);
  }, [asHex, length, onChange, validate, withLength]);

  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsxs(Input, {
      className: size,
      defaultValue: defaultValue,
      isAction: !!children,
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      placeholder: t('0x prefixed hex, e.g. 0x1234 or ascii data'),
      type: "text",
      withEllipsis: true,
      withLabel: withLabel,
      children: [children, withCopy && /*#__PURE__*/_jsx(CopyButton, {
        value: defaultValue
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(BaseBytes);