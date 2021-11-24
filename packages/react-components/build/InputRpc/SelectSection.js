// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Dropdown from "../Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";

function SelectSection({
  className = '',
  defaultValue,
  isError,
  onChange,
  options,
  value
}) {
  return /*#__PURE__*/_jsx(Dropdown, {
    className: `ui--DropdownLinked-Sections ${className}`,
    defaultValue: defaultValue,
    isError: isError,
    onChange: onChange,
    options: options,
    value: value.section,
    withLabel: false
  });
}

export default /*#__PURE__*/React.memo(SelectSection);