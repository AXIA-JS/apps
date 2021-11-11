// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import AddressMini from "./AddressMini.js";
import Toggle from "./Toggle.js";
import { checkVisibility } from "./util/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressToggle({
  address,
  className = '',
  filter,
  isHidden,
  noToggle,
  onChange,
  value
}) {
  const {
    api
  } = useApi();
  const info = useCall(api.derive.accounts.info, [address]);
  const isVisible = useMemo(() => info ? checkVisibility(api, address, info, filter, false) : true, [api, address, filter, info]);

  const _onClick = useCallback(() => onChange && onChange(!value), [onChange, value]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--AddressToggle ${className}${value || noToggle ? ' isAye' : ' isNay'}${isHidden || !isVisible ? ' isHidden' : ''}`,
    onClick: _onClick,
    children: [/*#__PURE__*/_jsx(AddressMini, {
      className: "ui--AddressToggle-address",
      value: address,
      withSidebar: false
    }), !noToggle && /*#__PURE__*/_jsx("div", {
      className: "ui--AddressToggle-toggle",
      children: /*#__PURE__*/_jsx(Toggle, {
        label: "",
        value: value
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(AddressToggle).withConfig({
  displayName: "AddressToggle",
  componentId: "sc-11zmdob-0"
})(["align-items:flex-start;border:1px solid transparent;border-radius:0.25rem;cursor:pointer;display:flex;justify-content:space-between;margin:0.125rem;padding:0.125rem 0.25rem;text-align:left;vertical-align:middle;white-space:nowrap;.ui--AddressToggle-address{filter:grayscale(100%);opacity:0.5;}&:hover{border-color:#ccc;}&.isHidden{display:none;}&.isDragging{background:white;box-shadow:0px 3px 5px 0px rgba(0,0,0,0.15);}.ui--AddressToggle-address,.ui--AddressToggle-toggle{flex:1;padding:0;}.ui--AddressToggle-toggle{margin-top:0.1rem;text-align:right;}&.isAye{.ui--AddressToggle-address{filter:none;opacity:1;}}"]));