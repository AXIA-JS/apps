// Copyright 2017-2021 @axia-js/page-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import AccountName from '@axia-js/react-components/AccountName';
import { Icon } from '@axia-js/react-components/index';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ParentAccount({
  address,
  className
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    "data-testid": "parent",
    children: [/*#__PURE__*/_jsx(Icon, {
      className: "parent-icon",
      icon: "code-branch"
    }), /*#__PURE__*/_jsx(AccountName, {
      value: address,
      withSidebar: true
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(ParentAccount).withConfig({
  displayName: "ParentAccount",
  componentId: "sc-zyqrl9-0"
})(["align-items:center;color:#8B8B8B;font-size:0.75rem;display:flex;& .parent-icon{font-size:0.625rem;margin-right:0.3rem;margin-left:0.15rem;}"]));