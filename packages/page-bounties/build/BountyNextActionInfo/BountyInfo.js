// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Icon } from '@axia-js/react-components';
import { bountySvgColor } from "../theme.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BountyInfo({
  className = '',
  description,
  type = 'info'
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [type === 'warning' && /*#__PURE__*/_jsx("div", {
      className: "info-icon",
      children: /*#__PURE__*/_jsx(Icon, {
        icon: 'exclamation-triangle'
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "description",
      children: description
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(BountyInfo).withConfig({
  displayName: "BountyInfo",
  componentId: "sc-p2pain-0"
})(({
  theme
}) => `
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.857rem;
  line-height: 1.5rem;

  .info-icon{
    margin-right: 0.2rem;
    svg {
      color: ${bountySvgColor[theme.theme]};
    }
  }

  .description {
    font-weight: 400;
    font-size: 0.714rem;
    line-height: 0.864rem;
    color: var(--color-label);
    word-wrap: break-word;
  }
`));