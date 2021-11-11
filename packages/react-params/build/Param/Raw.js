// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Input } from '@axia-js/react-components';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Raw({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  withLabel
}) {
  const [isValid, setIsValid] = useState(false);

  const _onChange = useCallback(value => {
    const isValid = value.length !== 0;
    onChange && onChange({
      isValid,
      value
    });
    setIsValid(isValid);
  }, [onChange]);

  const defaultValue = value ? value.toHex ? value.toHex() : value : '';
  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(Input, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      placeholder: "Hex data",
      type: "text",
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(Raw);