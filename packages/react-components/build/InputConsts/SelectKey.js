// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Dropdown from "../Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";

function transform({
  value
}) {
  return method => {
    const section = value.section;
    return {
      method,
      section
    };
  };
}

function SelectKey(props) {
  const {
    className = '',
    isError,
    onChange,
    options,
    value
  } = props;

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Dropdown, {
    className: `ui--DropdownLinked-Items ${className}`,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: transform(props),
    value: value.method,
    withLabel: false
  });
}

export default /*#__PURE__*/React.memo(SelectKey);