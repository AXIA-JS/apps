// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
const Wrapper = styled.div.withConfig({
  displayName: "Base__Wrapper",
  componentId: "sc-atk4x1-0"
})(["position:relative;display:inline-block;padding:1em 1em 0;height:15vw;width:15vw;"]);

function BaseChart({
  children,
  className = ''
}) {
  return /*#__PURE__*/_jsx(Wrapper, {
    className: `ui--Chart ${className}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(BaseChart);