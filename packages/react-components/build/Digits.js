// Copyright 2017-2021 @axia-js/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Digits({
  className = '',
  value
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: value.split(',').map((parts, index) => /*#__PURE__*/_jsxs("div", {
      className: "group",
      children: [index !== 0 ? ',' : '', parts.split('').map((d, index) => /*#__PURE__*/_jsx("div", {
        className: "digit",
        children: d
      }, index))]
    }, index))
  });
}

export default /*#__PURE__*/React.memo(styled(Digits).withConfig({
  displayName: "Digits",
  componentId: "sc-1nhc2iv-0"
})(["display:inline-block;white-space:nowrap;.group{display:inline-block;.digit{display:inline-block;text-align:center;width:1ch;}}"]));