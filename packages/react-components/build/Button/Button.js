// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Icon from "../Icon.js";
import Spinner from "../Spinner.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Button({
  activeOnEnter,
  children,
  className = '',
  dataTestId = '',
  icon,
  isBasic,
  isBusy,
  isCircular,
  isDisabled,
  isFull,
  isIcon,
  isSelected,
  isToplevel,
  label,
  onClick,
  isReadOnly = !onClick,
  onMouseEnter,
  onMouseLeave,
  tabIndex,
  withoutLink
}) {
  const _onClick = useCallback(() => !(isBusy || isDisabled) && onClick && onClick(), [isBusy, isDisabled, onClick]);

  const listenKeyboard = useCallback(event => {
    if (!isBusy && !isDisabled && event.key === 'Enter') {
      onClick && onClick();
    }
  }, [isBusy, isDisabled, onClick]);
  useEffect(() => {
    if (activeOnEnter) {
      window.addEventListener('keydown', listenKeyboard, true);
    }

    return () => {
      if (activeOnEnter) {
        window.removeEventListener('keydown', listenKeyboard, true);
      }
    };
  }, [activeOnEnter, listenKeyboard]);
  return /*#__PURE__*/_jsxs("button", {
    className: `ui--Button${label ? ' hasLabel' : ''}${isBasic ? ' isBasic' : ''}${isCircular ? ' isCircular' : ''}${isFull ? ' isFull' : ''}${isIcon ? ' isIcon' : ''}${isBusy || isDisabled ? ' isDisabled' : ''}${isBusy ? ' isBusy' : ''}${isReadOnly ? ' isReadOnly' : ''}${isSelected ? ' isSelected' : ''}${isToplevel ? ' isToplevel' : ''}${withoutLink ? ' withoutLink' : ''} ${className}`,
    "data-testid": dataTestId,
    onClick: _onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    tabIndex: tabIndex,
    children: [icon && /*#__PURE__*/_jsx(Icon, {
      icon: icon
    }), label, children, /*#__PURE__*/_jsx(Spinner, {
      className: "ui--Button-spinner",
      variant: "cover"
    })]
  });
}

const ICON_PADDING = 0.5;
export default /*#__PURE__*/React.memo(styled(Button).withConfig({
  displayName: "Button",
  componentId: "sc-1jumd80-0"
})(["background:transparent;border:none;color:inherit;cursor:pointer;line-height:1;margin:0;outline:none;position:relative;vertical-align:middle;text-align:center;&:not(.hasLabel){padding:0.7em;.ui--Icon{padding:0.6rem;margin:-0.6rem;}}&:not(.isCircular){border-radius:0.25rem;}&:focus{outline:0;}&.hasLabel{padding:0.7rem 1.1rem 0.7rem ", "rem;.ui--Icon{margin-right:0.425rem !important;}}&.isBasic{background:var(--bg-table);}&.isCircular{border-radius:10rem;}&.isDisabled,&.isReadOnly{background:none;box-shadow:none;cursor:not-allowed;}&.isBusy{cursor:wait;}&.isFull{display:block;width:100%;}&.isIcon{background:transparent;}.ui--Button-spinner{visibility:hidden;}.ui--Button-overlay{background:rgba(253,252,251,0.75);bottom:0;left:0;position:absolute;right:0;top:0;visibility:hidden;}.ui--Icon{border-radius:50%;box-sizing:content-box;height:1rem;margin:-", "rem 0;padding:", "rem;width:1rem;}&.isBusy{.ui--Button-spinner{visibility:visible;}}&.isDisabled{color:#bcbbba;}"], 1.1 - ICON_PADDING, ICON_PADDING, ICON_PADDING));