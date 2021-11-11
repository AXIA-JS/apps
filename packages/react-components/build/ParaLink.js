// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useParaEndpoints } from '@axia-js/react-hooks';
import ChainImg from "./ChainImg.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ParaLink({
  className,
  id
}) {
  const endpoints = useParaEndpoints(id);

  if (!endpoints.length) {
    return null;
  }

  const {
    info,
    text,
    value
  } = endpoints[endpoints.length - 1];
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(ChainImg, {
      isInline: true,
      logo: info || 'empty',
      withoutHl: true
    }), /*#__PURE__*/_jsx("a", {
      className: "chainAlign",
      href: `${window.location.origin}${window.location.pathname}?rpc=${encodeURIComponent(value)}`,
      children: text
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(ParaLink).withConfig({
  displayName: "ParaLink",
  componentId: "sc-sac1kg-0"
})(["vertical-align:middle;white-space:nowrap;a.chainAlign{display:inline-block;height:24px;line-height:24px;max-width:10em;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;}"]));