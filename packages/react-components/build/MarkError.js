// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function MarkError({
  children,
  className = '',
  content
}) {
  return /*#__PURE__*/_jsxs("article", {
    className: `mark error ${className}`,
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: "exclamation-triangle"
    }), content, children]
  });
}

export default /*#__PURE__*/React.memo(styled(MarkError).withConfig({
  displayName: "MarkError",
  componentId: "sc-1omi6tx-0"
})([".ui--Icon{color:rgba(255,12,12,1);margin-right:0.5rem;}"]));