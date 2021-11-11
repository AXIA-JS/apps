// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Input } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function InputName({
  className,
  isBusy,
  isContract,
  isError,
  onChange,
  onEnter,
  value = ''
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx(Input, {
    className: className,
    help: t(isContract ? 'A name for the deployed contract to help users distinguish. Only used for display purposes.' : 'A name for this WASM code to help users distinguish. Only used for display purposes.'),
    isDisabled: isBusy,
    isError: isError,
    label: t(isContract ? 'contract name' : 'code bundle name'),
    onChange: onChange,
    onEnter: onEnter,
    value: value
  });
}

export default /*#__PURE__*/React.memo(InputName);