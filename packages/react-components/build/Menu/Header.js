// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Header({
  children,
  className
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(Header).withConfig({
  displayName: "Header",
  componentId: "sc-16pxxl3-0"
})(["text-transform:uppercase;font-size:0.714rem;line-height:0.857rem;margin-bottom:0.3rem;"]));