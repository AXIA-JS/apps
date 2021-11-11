// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BitLengthOption } from '@axia-js/react-components/constants';
import { formatBalance, isUndefined } from '@axia-js/util';
import InputNumber from "./InputNumber.js";
import { jsx as _jsx } from "react/jsx-runtime";
const DEFAULT_BITLENGTH = BitLengthOption.CHAIN_SPEC;

function reformat(value, isDisabled, siDecimals) {
  if (!value) {
    return [];
  }

  const decimals = isUndefined(siDecimals) ? formatBalance.getDefaults().decimals : siDecimals;
  const si = isDisabled ? formatBalance.calcSi(value.toString(), decimals) : formatBalance.findSi('-');
  return [formatBalance(value, {
    decimals,
    forceUnit: si.value,
    withSi: false
  }).replace(',', isDisabled ? ',' : ''), si];
}

function InputBalance({
  autoFocus,
  children,
  className = '',
  defaultValue: inDefault,
  help,
  isDisabled,
  isError,
  isFull,
  isWarning,
  isZeroable,
  label,
  labelExtra,
  maxValue,
  onChange,
  onEnter,
  onEscape,
  placeholder,
  siDecimals,
  siSymbol,
  value,
  withEllipsis,
  withLabel,
  withMax
}) {
  const [defaultValue, siDefault] = useMemo(() => reformat(inDefault, isDisabled, siDecimals), [inDefault, isDisabled, siDecimals]);
  return /*#__PURE__*/_jsx(InputNumber, {
    autoFocus: autoFocus,
    bitLength: DEFAULT_BITLENGTH,
    className: `ui--InputBalance ${className}`,
    defaultValue: defaultValue,
    help: help,
    isDisabled: isDisabled,
    isError: isError,
    isFull: isFull,
    isSi: true,
    isWarning: isWarning,
    isZeroable: isZeroable,
    label: label,
    labelExtra: labelExtra,
    maxValue: maxValue,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    placeholder: placeholder,
    siDecimals: siDecimals,
    siDefault: siDefault,
    siSymbol: siSymbol,
    value: value,
    withEllipsis: withEllipsis,
    withLabel: withLabel,
    withMax: withMax,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(InputBalance).withConfig({
  displayName: "InputBalance",
  componentId: "sc-x63pwj-0"
})(["&&:not(.isSmall) .labelExtra{right:6.5rem;}.ui.action.input.ui--Input > .buttons{align-items:stretch;.ui--SiDropdown.ui.button.compact.floating.selection.dropdown{&.disabled{border-style:solid;opacity:1 !important;}> div.text:first-child{font-size:0.9em;position:absolute;top:50%;transform:translateY(-50%);left:0.5rem;width:3rem;}}}"]));