// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components/index';
import { useOutsideClick, useToggle } from '@axia-js/react-hooks';
import PopupWindow from "./PopupWindow.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Popup({
  children,
  className = '',
  isDisabled = false,
  onCloseAction,
  position = 'left',
  value
}) {
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  useOutsideClick([triggerRef, dropdownRef], () => setIsOpen(false));
  useEffect(() => {
    if (!isOpen && onCloseAction) {
      onCloseAction();
    }
  }, [isOpen, onCloseAction]);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Popup ${className}`,
    children: [isOpen && /*#__PURE__*/_jsx(PopupWindow, {
      position: position,
      triggerRef: triggerRef,
      windowRef: dropdownRef,
      children: value
    }), /*#__PURE__*/_jsx("div", {
      onClick: toggleIsOpen,
      ref: triggerRef,
      children: children !== null && children !== void 0 ? children : /*#__PURE__*/_jsx(Button, {
        className: isOpen ? 'isOpen' : '',
        icon: "ellipsis-v",
        isDisabled: isDisabled,
        isReadOnly: false
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Popup).withConfig({
  displayName: "Popup",
  componentId: "sc-1e5r9gu-0"
})(["display:inline-flex;flex-direction:column;justify-content:center;position:relative;"]));