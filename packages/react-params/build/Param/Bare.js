// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Bare({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: `ui--row ${className}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(Bare).withConfig({
  displayName: "Bare",
  componentId: "sc-1gvkkyn-0"
})(["position:relative;"]));