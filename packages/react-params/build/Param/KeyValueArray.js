// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { assert, isHex, u8aToHex, u8aToString } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import Base from "./Base.js";
import Bytes from "./Bytes.js";
import File from "./File.js";
import { createParam } from "./KeyValue.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BYTES_TYPE = {
  info: 0,
  type: 'Bytes'
};
const EMPTY_PLACEHOLDER = 'click to select or drag and drop JSON key/value (hex-encoded) file';

function parseFile(raw) {
  const json = JSON.parse(u8aToString(raw));
  const keys = Object.keys(json);
  let isValid = keys.length !== 0;
  const value = keys.map(key => {
    const value = json[key];
    assert(isHex(key) && isHex(value), `Non-hex key/value pair found in ${key.toString()} => ${value.toString()}`);
    const encKey = createParam(key);
    const encValue = createParam(value);
    isValid = isValid && encKey.isValid && encValue.isValid;
    return [encKey.u8a, encValue.u8a];
  });
  return {
    isValid,
    value
  };
}

function KeyValueArray({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const [placeholder, setPlaceholder] = useState(t(EMPTY_PLACEHOLDER));

  const _onChange = useCallback(raw => {
    let encoded = {
      isValid: false,
      value: []
    };

    try {
      encoded = parseFile(raw);
      setPlaceholder(t('{{count}} key/value pairs encoded for submission', {
        replace: {
          count: encoded.value.length
        }
      }));
    } catch (error) {
      console.error('Error converting json k/v', error);
      setPlaceholder(t(EMPTY_PLACEHOLDER));
    }

    onChange && onChange(encoded);
  }, [onChange, t]);

  if (isDisabled) {
    const pairs = defaultValue.value;
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Base, {
        className: className,
        label: label,
        children: /*#__PURE__*/_jsx("div", {})
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--Params",
        children: pairs.map(([key, value]) => {
          const keyHex = u8aToHex(key.toU8a(true));
          return /*#__PURE__*/_jsx(Bytes, {
            defaultValue: {
              value
            },
            isDisabled: true,
            label: keyHex,
            name: keyHex,
            onEnter: onEnter,
            onEscape: onEscape,
            type: BYTES_TYPE
          }, keyHex);
        })
      })]
    });
  }

  return /*#__PURE__*/_jsx(File, {
    className: className,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    onChange: _onChange,
    placeholder: placeholder,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(KeyValueArray);