// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function ChainColorIndicator({
  className,
  color
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    color: color
  });
}

export default /*#__PURE__*/React.memo(styled(ChainColorIndicator).withConfig({
  displayName: "ChainColorIndicator",
  componentId: "sc-b8p0w0-0"
})(["background-color:", " !important;width:100px;flex:1;border-radius:4px;"], props => props.color));