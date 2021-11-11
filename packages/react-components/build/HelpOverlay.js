// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import ReactMd from 'react-markdown';
import styled from 'styled-components';
import { useToggle } from '@axia-js/react-hooks';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function HelpOverlay({
  className = '',
  md
}) {
  const [isVisible, toggleVisible] = useToggle();
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--HelpOverlay ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "help-button",
      children: /*#__PURE__*/_jsx(Icon, {
        icon: "question-circle",
        onClick: toggleVisible
      })
    }), /*#__PURE__*/_jsxs("div", {
      className: `help-slideout ${isVisible ? 'open' : 'closed'}`,
      children: [/*#__PURE__*/_jsx("div", {
        className: "help-button",
        children: /*#__PURE__*/_jsx(Icon, {
          icon: "times",
          onClick: toggleVisible
        })
      }), /*#__PURE__*/_jsx(ReactMd, {
        className: "help-content",
        escapeHtml: false,
        source: md
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(HelpOverlay).withConfig({
  displayName: "HelpOverlay",
  componentId: "sc-1nvyvam-0"
})([".help-button{color:var(--color-text);cursor:pointer;font-size:2rem;padding:0.35rem 1.5rem 0 0;}> .help-button{position:absolute;right:0rem;top:0rem;z-index:10;}.help-slideout{background:var(--bg-page);box-shadow:-6px 0px 20px 0px rgba(0,0,0,0.3);bottom:0;max-width:50rem;overflow-y:scroll;position:fixed;right:-50rem;top:0;transition-duration:.5s;transition-property:all;z-index:225;.help-button{text-align:right;}.help-content{padding:1rem 1.5rem 5rem;}&.open{right:0;}}"]));