// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Button from "../Button/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Header({
  className = '',
  header,
  onClose
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: `${className} ui--Modal__Header`,
    children: [header && /*#__PURE__*/_jsx("h1", {
      children: header
    }), /*#__PURE__*/_jsx(Button, {
      dataTestId: "close-modal",
      icon: "times",
      onClick: onClose
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Header).withConfig({
  displayName: "Header",
  componentId: "sc-1ehxlgd-0"
})(["display:flex;justify-content:space-between;padding:0.75rem 1.5rem 0;"]));