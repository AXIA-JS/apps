// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import BN from 'bn.js';
import React, { useCallback, useState } from 'react';
import { InputBalance } from '@axia-js/react-components';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Balance({
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
  const [defaultValue] = useState(() => new BN((value || '0').toString()).toString(10));

  const _onChange = useCallback(value => {
    const isValid = !isError && !!value;
    onChange && onChange({
      isValid,
      value
    });
    setIsValid(isValid);
  }, [isError, onChange]);

  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(InputBalance, {
      className: "full",
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      withEllipsis: true,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(Balance);
export { Balance };