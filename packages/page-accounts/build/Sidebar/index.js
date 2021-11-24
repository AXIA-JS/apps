// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useState } from 'react';
import Sidebar from "./Sidebar.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const AccountSidebarToggle = /*#__PURE__*/React.createContext(undefined);

function AccountSidebar({
  children
}) {
  const [[address, onUpdateName], setAddress] = useState([null, null]);
  const onClose = useCallback(() => setAddress([null, null]), []);
  return /*#__PURE__*/_jsxs(AccountSidebarToggle.Provider, {
    value: setAddress,
    children: [children, address && /*#__PURE__*/_jsx(Sidebar, {
      address: address,
      dataTestId: "account-sidebar",
      onClose: onClose,
      onUpdateName: onUpdateName
    })]
  });
}

export { AccountSidebarToggle };
export default /*#__PURE__*/React.memo(AccountSidebar);