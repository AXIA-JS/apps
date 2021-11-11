// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { createGlobalStyle, ThemeContext } from 'styled-components';
import Header from "./Header.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ESC_KEYCODE = 27;

function Base(props) {
  const {
    theme
  } = useContext(ThemeContext);
  const {
    children,
    className = '',
    header,
    onClose,
    size = 'medium',
    testId = 'modal'
  } = props;
  const listenKeyboard = useCallback(event => {
    if (event.key === 'Escape' || event.keyCode === ESC_KEYCODE) {
      onClose();
    }
  }, [onClose]);
  useEffect(() => {
    window.addEventListener('keydown', listenKeyboard, true);
    return () => {
      window.removeEventListener('keydown', listenKeyboard, true);
    };
  }, [listenKeyboard]);
  return /*#__PURE__*/createPortal( /*#__PURE__*/_jsxs("div", {
    className: `theme--${theme} ui--Modal ${className} size-${size}`,
    "data-testid": testId,
    children: [/*#__PURE__*/_jsx(DisableGlobalScroll, {}), /*#__PURE__*/_jsx("div", {
      className: "ui--Modal__overlay",
      onClick: onClose
    }), /*#__PURE__*/_jsxs("div", {
      className: "ui--Modal__body",
      children: [/*#__PURE__*/_jsx(Header, {
        header: header,
        onClose: onClose
      }), children]
    })]
  }), document.body);
}

const DisableGlobalScroll = createGlobalStyle(["body{overflow:hidden;}"]);
export default /*#__PURE__*/React.memo(styled(Base).withConfig({
  displayName: "Base",
  componentId: "sc-1dkorvk-0"
})(["position:fixed;top:0;left:0;width:100%;height:100%;min-height:100vh;z-index:1000;overflow-y:auto;.ui--Modal__overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(96,96,96,0.5);}.ui--Modal__body{margin-top:30px;background:var(--bg-page);border-radius:4px;box-shadow:none;display:flex;flex-direction:column;position:absolute;top:0;left:50%;transform:translate(-50%,0);max-width:900px;width:calc(100% - 16px);color:var(--color-text);font:var(--font-sans);}&.size-small .ui--Modal__body{max-width:720px;}&.size-large .ui--Modal__body{max-width:1080px;}"]));