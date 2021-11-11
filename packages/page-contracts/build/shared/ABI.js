// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { IconLink, InputFile, Labelled } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Messages from "./Messages.js";
import { jsx as _jsx } from "react/jsx-runtime";

const NOOP = () => undefined;

function ABI({
  className,
  contractAbi,
  errorText,
  isDisabled,
  isError,
  isFull,
  isValid,
  label,
  onChange,
  onRemove = NOOP,
  onSelectConstructor,
  withConstructors = true,
  withLabel = true,
  withMessages = true,
  withWasm
}) {
  const {
    t
  } = useTranslation();
  return contractAbi && isValid ? /*#__PURE__*/_jsx(Labelled, {
    className: className,
    help: t('This is the ABI as supplied. Any calls to the contract will use this information for encoding.'),
    label: label || t('contract ABI'),
    labelExtra: onRemove && /*#__PURE__*/_jsx(IconLink, {
      icon: "trash",
      label: t('Remove ABI'),
      onClick: onRemove
    }),
    withLabel: withLabel,
    children: /*#__PURE__*/_jsx(Messages, {
      contractAbi: contractAbi,
      isLabelled: withLabel,
      onSelectConstructor: onSelectConstructor,
      withConstructors: withConstructors,
      withMessages: withMessages,
      withWasm: withWasm
    })
  }) : /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(InputFile, {
      help: t('The ABI for the WASM code. The ABI is required and stored for future operations such as sending messages.'),
      isDisabled: isDisabled,
      isError: isError,
      isFull: isFull,
      label: label || t('contract ABI'),
      onChange: onChange,
      placeholder: errorText || t('click to select or drag and drop a JSON file')
    })
  });
}

export default /*#__PURE__*/React.memo(ABI);