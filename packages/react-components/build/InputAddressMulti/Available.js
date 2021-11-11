// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import AddressToggle from "../AddressToggle.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Available({
  address,
  filter,
  isHidden,
  onSelect
}) {
  const _onSelect = useCallback(() => onSelect(address), [address, onSelect]);

  if (isHidden) {
    return null;
  }

  return /*#__PURE__*/_jsx(AddressToggle, {
    address: address,
    filter: filter,
    noToggle: true,
    onChange: _onSelect
  });
}

export default /*#__PURE__*/React.memo(Available);