// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import BaseExtrinsic from "../Extrinsic.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ExtrinsicDisplay({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  isPrivate,
  label,
  onChange,
  onEnter,
  onEscape,
  withLabel
}) {
  const _onChange = useCallback(method => onChange && onChange({
    isValid: !!method,
    value: method
  }), [onChange]);

  return /*#__PURE__*/_jsx(BaseExtrinsic, {
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    isPrivate: isPrivate,
    label: label,
    onChange: _onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(ExtrinsicDisplay);