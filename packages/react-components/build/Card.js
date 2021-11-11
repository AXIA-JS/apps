// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Card({
  children,
  className = '',
  isError,
  isSuccess,
  withBottomMargin
}) {
  return /*#__PURE__*/_jsx("article", {
    className: `ui--Card ${className}${isError && !isSuccess ? ' error' : ''}${!isError && isSuccess ? ' success' : ''}${withBottomMargin ? ' withBottomMargin' : ''}`,
    children: children
  });
}

export default /*#__PURE__*/React.memo(styled(Card).withConfig({
  displayName: "Card",
  componentId: "sc-60lnlt-0"
})(["position:relative;flex:1 1;min-width:24%;justify-content:space-around;label{opacity:0.42;}i.help.circle.icon,.ui.button.mini,.ui.button.tiny,.addTags{visibility:hidden;}.ui--AddressSummary-buttons{text-align:right;margin-bottom:2em;button{margin-left:0.2em;}}&:hover{i.help.circle.icon,.ui.button.mini,.ui.button.tiny,.addTags{visibility:visible;}label{opacity:1;}}&.error{background:rgba(255,0,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(156,0,0) !important;}}&.success{border:1px solid rgb(168,255,136);background:rgba(0,255,0,0.05);&,h1,h2,h3,h4,h5,h6,p{color:rgba(34,125,0) !important;}}&.withBottomMargin{margin-bottom:1.5rem;}"]));