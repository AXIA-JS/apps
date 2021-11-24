// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import { Toggle } from '@axia-js/react-components';
import { u8aToHex } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import BaseBytes from "./BaseBytes.js";
import File from "./File.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Hash256({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  isInOption,
  label,
  name,
  onChange,
  onEnter,
  onEscape,
  registry,
  type,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const [isFileDrop, setFileInput] = useState(false);
  const [placeholder, setPlaceholder] = useState(null);

  const _onChangeFile = useCallback(u8a => {
    const value = registry.hash(u8a);
    setPlaceholder(u8aToHex(value));
    onChange && onChange({
      isValid: true,
      value
    });
  }, [onChange, registry]);

  const _setFileInput = useCallback(value => {
    setPlaceholder(null);
    setFileInput(value);
  }, [setFileInput, setPlaceholder]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [!isDisabled && isFileDrop ? /*#__PURE__*/_jsx(File, {
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: _onChangeFile,
      placeholder: placeholder || undefined,
      withLabel: withLabel
    }) : /*#__PURE__*/_jsx(BaseBytes, {
      asHex: true,
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: 32,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withCopy: isDisabled,
      withLabel: withLabel
    }), !isDisabled && !isInOption && /*#__PURE__*/_jsx(Toggle, {
      isOverlay: true,
      label: t('hash a file'),
      onChange: _setFileInput,
      value: isFileDrop
    })]
  });
}

export default /*#__PURE__*/React.memo(Hash256);