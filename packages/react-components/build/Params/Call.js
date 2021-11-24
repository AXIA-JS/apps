// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import Extrinsic from "./Extrinsic.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Call({
  className = '',
  isDisabled,
  isError,
  label,
  onChange,
  onEnter,
  onEscape,
  withLabel
}) {
  const {
    api,
    apiDefaultTx
  } = useApi();

  const defaultValue = (() => {
    try {
      return api.tx.balances.transfer;
    } catch (error) {
      return apiDefaultTx;
    }
  })();

  return /*#__PURE__*/_jsx(Extrinsic, {
    className: className,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    isPrivate: false,
    label: label,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(Call);