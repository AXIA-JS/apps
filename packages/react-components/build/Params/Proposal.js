// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import { useApi } from '@axia-js/react-hooks';
import ExtrinsicDisplay from "./Extrinsic.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ProposalDisplay({
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
    apiDefaultTxSudo
  } = useApi();

  const _onChange = useCallback(({
    isValid,
    value
  }) => {
    let proposal = null;

    if (isValid && value) {
      proposal = api.createType('Proposal', value);
    }

    onChange && onChange({
      isValid,
      value: proposal
    });
  }, [api, onChange]);

  return /*#__PURE__*/_jsx(ExtrinsicDisplay, {
    className: className,
    defaultValue: apiDefaultTxSudo,
    isDisabled: isDisabled,
    isError: isError,
    isPrivate: true,
    label: label,
    onChange: _onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    withLabel: withLabel
  });
}

export default /*#__PURE__*/React.memo(ProposalDisplay);