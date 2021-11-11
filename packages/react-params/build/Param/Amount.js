// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import { Input, InputNumber } from '@axia-js/react-components';
import { bnToBn, formatNumber, isUndefined } from '@axia-js/util';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Amount({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  registry,
  type,
  withLabel
}) {
  const defaultValue = useMemo(() => isDisabled ? value instanceof registry.createClass('AccountIndex') ? value.toString() : formatNumber(value) : bnToBn(value || 0).toString(), [isDisabled, registry, value]);
  const bitLength = useMemo(() => {
    try {
      return registry.createType(type.type).bitLength();
    } catch (error) {
      return 32;
    }
  }, [registry, type]);

  const _onChange = useCallback(value => onChange && onChange({
    isValid: !isUndefined(value),
    value
  }), [onChange]);

  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: isDisabled ? /*#__PURE__*/_jsx(Input, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: true,
      label: label,
      withEllipsis: true,
      withLabel: withLabel
    }) : /*#__PURE__*/_jsx(InputNumber, {
      bitLength: bitLength,
      className: "full",
      defaultValue: defaultValue,
      isError: isError,
      isZeroable: true,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(Amount);