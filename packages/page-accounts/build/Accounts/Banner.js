// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Banner({
  children,
  className = '',
  type
}) {
  return /*#__PURE__*/_jsx("article", {
    className: `${className} ${type} centered`,
    children: /*#__PURE__*/_jsx("div", {
      className: "box",
      children: children
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Banner).withConfig({
  displayName: "Banner",
  componentId: "sc-7zx6r9-0"
})([".box{padding:0 0.5rem;}"]));