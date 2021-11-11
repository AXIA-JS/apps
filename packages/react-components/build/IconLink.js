// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function IconLink({
  className = '',
  href,
  icon,
  label,
  onClick,
  rel,
  target
}) {
  return /*#__PURE__*/_jsxs("a", {
    className: className,
    href: href,
    onClick: onClick,
    rel: rel,
    target: target,
    children: [icon && /*#__PURE__*/_jsx(Icon, {
      icon: icon
    }), label]
  });
}

export default /*#__PURE__*/React.memo(styled(IconLink).withConfig({
  displayName: "IconLink",
  componentId: "sc-p8x4s4-0"
})([".ui--Icon{margin-right:0.5em;}"]));