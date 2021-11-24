// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import Dropdown from "../Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";

function SelectMethod({
  api,
  className = '',
  defaultValue,
  isDisabled,
  isError,
  onChange,
  options,
  value
}) {
  const transform = useCallback(method => api.tx[value.section][method], [api, value]);

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Dropdown, {
    className: `ui--DropdownLinked-Items ${className}`,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: transform,
    value: value.method,
    withLabel: false
  });
}

export default /*#__PURE__*/React.memo(SelectMethod);