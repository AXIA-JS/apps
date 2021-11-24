// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import AddressToggle from "../AddressToggle.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Selected({
  address,
  filter,
  isHidden,
  onDeselect
}) {
  const _onDeselect = useCallback(() => onDeselect(address), [address, onDeselect]);

  if (isHidden) {
    return null;
  }

  return /*#__PURE__*/_jsx(AddressToggle, {
    address: address,
    filter: filter,
    noToggle: true,
    onChange: _onDeselect
  });
}

export default /*#__PURE__*/React.memo(Selected);