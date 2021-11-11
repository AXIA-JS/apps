// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function extractIndex({
  accountIndex
} = {}) {
  return accountIndex ? accountIndex.toString() : null;
}

function AccountIndex({
  children,
  className = '',
  defaultValue,
  label,
  value
}) {
  const {
    api
  } = useApi();
  const info = useCall(api.derive.accounts.info, [value]);
  const accountIndex = useMemo(() => extractIndex(info), [info]);

  if (!api.query.indices) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--AccountIndex ${className}`,
    children: [label || '', /*#__PURE__*/_jsx("div", {
      className: "account-index",
      children: accountIndex || defaultValue || '-'
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(AccountIndex).withConfig({
  displayName: "AccountIndex",
  componentId: "sc-1c5niin-0"
})([".account-index{font:var(--font-mono);}"]));