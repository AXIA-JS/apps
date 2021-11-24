// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Foot({
  className = '',
  footer,
  isEmpty
}) {
  if (!footer || isEmpty) {
    return null;
  }

  return /*#__PURE__*/_jsx("tfoot", {
    className: className,
    children: footer
  });
}

export default /*#__PURE__*/React.memo(styled(Foot).withConfig({
  displayName: "Foot",
  componentId: "sc-5j0bhj-0"
})(["td{color:var(--color-table-foot);font:var(--font-sans);font-weight:var(--font-weight-normal);padding:0.75rem 1rem 0.25rem;text-align:right;vertical-align:baseline;white-space:nowrap;}tr{background:var(--bg-page);}"]));