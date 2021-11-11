// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { Static } from '@axia-js/react-components';
import Amount from "./Amount.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Moment({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  registry,
  type,
  withLabel
}) {
  const _onChange = useCallback(value => onChange && onChange(value), [onChange]);

  if (isDisabled) {
    return /*#__PURE__*/_jsx(Static, {
      className: className,
      defaultValue: defaultValue && defaultValue.value ? defaultValue.value.toString() : '',
      isError: isError,
      label: label,
      withLabel: withLabel
    });
  }

  return /*#__PURE__*/_jsx(Amount, {
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    label: label,
    onChange: _onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    registry: registry,
    type: type,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(Moment);