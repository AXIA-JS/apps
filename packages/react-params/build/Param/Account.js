// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { InputAddress } from '@axia-js/react-components';
import { keyring } from '@axia-js/ui-keyring';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Account({
  className = '',
  defaultValue: {
    value
  },
  isDisabled,
  isError,
  isInOption,
  label,
  onChange,
  withLabel
}) {
  const [defaultValue] = useState(() => value === null || value === void 0 ? void 0 : value.toString());

  const _onChange = useCallback(value => {
    let isValid = false;

    if (value) {
      try {
        keyring.decodeAddress(value);
        isValid = true;
      } catch (err) {
        console.error(err);
      }
    }

    onChange && onChange({
      isValid,
      value
    });
  }, [onChange]);

  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(InputAddress, {
      className: "full",
      defaultValue: defaultValue,
      hideAddress: isInOption,
      isDisabled: isDisabled,
      isError: isError,
      isInput: true,
      label: label,
      onChange: _onChange,
      placeholder: "5...",
      type: "allPlus",
      withEllipsis: true,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(Account);