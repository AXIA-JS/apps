// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { Dropdown } from '@axia-js/react-components';
import { bnToBn } from '@axia-js/util';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
const options = [{
  text: 'Super majority approval',
  value: 0
}, {
  text: 'Super majority rejection',
  value: 1
}, {
  text: 'Simple majority',
  value: 2
}];
export const textMap = options.reduce((textMap, {
  text,
  value
}) => {
  textMap[value] = text;
  return textMap;
}, {});

function VoteThresholdParam({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  label,
  onChange,
  registry,
  withLabel
}) {
  const _onChange = useCallback(value => onChange && onChange({
    isValid: true,
    value
  }), [onChange]);

  const defaultValue = value instanceof registry.createClass('VoteThreshold') ? value.toNumber() : bnToBn(value).toNumber();
  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(Dropdown, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChange,
      options: options,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(VoteThresholdParam);