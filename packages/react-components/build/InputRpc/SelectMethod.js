// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import Dropdown from "../Dropdown.js";
import useRpcs from "./useRpcs.js";
import { jsx as _jsx } from "react/jsx-runtime";

function SelectMethod({
  className = '',
  isError,
  onChange,
  options,
  value
}) {
  const rpcs = useRpcs();

  const _transform = useCallback(method => rpcs[value.section][method], [rpcs, value]);

  if (!options.length) {
    return null;
  }

  return /*#__PURE__*/_jsx(Dropdown, {
    className: `ui--DropdownLinked-Items ${className}`,
    isError: isError,
    onChange: onChange,
    options: options,
    transform: _transform,
    value: value.method,
    withLabel: false
  });
}

export default /*#__PURE__*/React.memo(SelectMethod);