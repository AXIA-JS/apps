// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function MarkWarning({
  children,
  className = '',
  content
}) {
  return /*#__PURE__*/_jsxs("article", {
    className: `mark warning ${className}`,
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: "exclamation-triangle"
    }), content, children]
  });
}

export default /*#__PURE__*/React.memo(styled(MarkWarning).withConfig({
  displayName: "MarkWarning",
  componentId: "sc-qiwtlc-0"
})([".ui--Icon{color:rgba(255,196,12,1);margin-right:0.5rem;}"]));