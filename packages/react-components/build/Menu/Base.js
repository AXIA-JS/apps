// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Base({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--Menu ${className}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(Base).withConfig({
  displayName: "Base",
  componentId: "sc-zfjpr9-0"
})(["display:flex;flex-direction:column;min-width:14.286rem;margin:1rem 0;& > *:not(.ui--Menu__Item):not(.ui--Menu__Divider){margin-right:1rem;margin-left:1rem;}"]));