// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function ButtonGroup({
  children,
  className = '',
  isCentered
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Button-Group${isCentered ? ' isCentered' : ''} ${className}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(ButtonGroup).withConfig({
  displayName: "Group",
  componentId: "sc-1cq2il0-0"
})(["margin:1rem 0;text-align:right;&.isCentered{margin-bottom:0.5rem;text-align:center;}&+.ui--Table{margin-top:1.5rem;}.ui--Button{margin:0 0.25rem;}.ui--CopyButton{display:inline-block;}"]));