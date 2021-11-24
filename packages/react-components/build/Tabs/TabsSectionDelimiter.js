// Copyright 2017-2020 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function TabsSectionDelimiter({
  className = ''
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx("svg", {
      fill: "none",
      height: "47",
      viewBox: "0 0 17 65",
      width: "17",
      xmlns: "http://www.w3.org/2000/svg",
      children: /*#__PURE__*/_jsx("path", {
        className: "highlight--stroke",
        d: "M1 1L16 32.5L1 64",
        stroke: "#D1D1D1"
      })
    })
  });
}

export default /*#__PURE__*/React.memo(styled(TabsSectionDelimiter).withConfig({
  displayName: "TabsSectionDelimiter",
  componentId: "sc-6lxs92-0"
})(["height:100%;width:auto;"]));