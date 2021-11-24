// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Content({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `${className} ui--Modal__Content`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(Content).withConfig({
  displayName: "Content",
  componentId: "sc-jw7f9o-0"
})(["padding:1.5rem;"]));