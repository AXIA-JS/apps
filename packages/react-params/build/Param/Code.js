// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { isWasm } from '@axia-js/util';
import Bytes from "./Bytes.js";
import BytesFile from "./File.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Code({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  type,
  withLabel
}) {
  const [isValid, setIsValid] = useState(false);

  const _onChange = useCallback(value => {
    const isValid = isWasm(value);
    onChange && onChange({
      isValid,
      value
    });
    setIsValid(isValid);
  }, [onChange]);

  if (isDisabled) {
    return /*#__PURE__*/_jsx(Bytes, {
      className: className,
      defaultValue: defaultValue,
      isError: isError || !isValid,
      label: label,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withLabel: withLabel
    });
  }

  return /*#__PURE__*/_jsx(BytesFile, {
    className: className,
    defaultValue: defaultValue,
    isError: isError || !isValid,
    label: label,
    onChange: _onChange,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(Code);