// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Toggle } from '@axia-js/react-components';
import { compactAddLength } from '@axia-js/util';
import { useTranslation } from "../translate.js";
import BaseBytes from "./BaseBytes.js";
import File from "./File.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Bytes({
  className = '',
  defaultValue,
  isDisabled,
  isError,
  label,
  name,
  onChange,
  onEnter,
  onEscape,
  type,
  withLabel
}) {
  const {
    t
  } = useTranslation();
  const [isValid, setIsValid] = useState(false);
  const [isFileDrop, setFileInput] = useState(false);

  const _onChangeFile = useCallback(value => {
    const isValid = value.length !== 0;
    onChange && onChange({
      isValid,
      value: compactAddLength(value)
    });
    setIsValid(isValid);
  }, [onChange]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [!isDisabled && isFileDrop ? /*#__PURE__*/_jsx(File, {
      isDisabled: isDisabled,
      isError: isError || !isValid,
      label: label,
      onChange: _onChangeFile,
      withLabel: withLabel
    }) : /*#__PURE__*/_jsx(BaseBytes, {
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      length: -1,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      type: type,
      withLabel: withLabel,
      withLength: true
    }), !isDisabled && /*#__PURE__*/_jsx(Toggle, {
      isOverlay: true,
      label: t('file upload'),
      onChange: setFileInput,
      value: isFileDrop
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Bytes).withConfig({
  displayName: "Bytes",
  componentId: "sc-184l52o-0"
})(["position:relative;"]));