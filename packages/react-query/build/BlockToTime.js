// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useBlockTime } from '@axia-js/react-hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BlockToTime({
  api,
  children,
  className = '',
  isInline,
  label,
  value
}) {
  const [, text] = useBlockTime(value, api);

  if (!value || value.isZero()) {
    return null;
  }

  return /*#__PURE__*/_jsxs("div", {
    className: `${className}${isInline ? ' isInline' : ''}`,
    children: [label || '', text.split(' ').map((v, index) => /*#__PURE__*/_jsx("span", {
      className: index % 2 ? 'timeUnits' : undefined,
      children: v
    }, index)), children]
  });
}

export default /*#__PURE__*/React.memo(styled(BlockToTime).withConfig({
  displayName: "BlockToTime",
  componentId: "sc-b38c7s-0"
})(["&.isInline{display:inline-block;}span+span{padding-left:0.25em;}span.timeUnits{font-size:0.825em;}"]));