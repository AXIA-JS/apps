// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Icon } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";

function ExpandButton({
  className = '',
  expanded,
  onClick
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--ExpandButton ${className}`,
    "data-testid": "row-toggle",
    onClick: onClick,
    children: /*#__PURE__*/_jsx(Icon, {
      icon: expanded ? 'caret-up' : 'caret-down'
    })
  });
}

export default /*#__PURE__*/React.memo(styled(ExpandButton).withConfig({
  displayName: "ExpandButton",
  componentId: "sc-198yrgt-0"
})(["display:flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;border:1px solid var(--border-table);border-radius:4px;cursor:pointer;"]));