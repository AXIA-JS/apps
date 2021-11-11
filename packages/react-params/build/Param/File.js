// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { InputFile } from '@axia-js/react-components';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";

function File({
  className = '',
  isDisabled,
  isError = false,
  label,
  onChange,
  placeholder,
  withLabel
}) {
  return /*#__PURE__*/_jsx(Bare, {
    className: className,
    children: /*#__PURE__*/_jsx(InputFile, {
      isDisabled: isDisabled,
      isError: isError,
      label: label,
      onChange: onChange,
      placeholder: placeholder,
      withEllipsis: true,
      withLabel: withLabel
    })
  });
}

export default /*#__PURE__*/React.memo(File);