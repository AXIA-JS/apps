// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Checkbox({
  className = '',
  isDisabled,
  label,
  onChange,
  value
}) {
  const _onClick = useCallback(() => {
    !isDisabled && onChange && onChange(!value);
  }, [isDisabled, onChange, value]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Checkbox${isDisabled ? ' isDisabled' : ''} ${className}`,
    onClick: _onClick,
    children: [/*#__PURE__*/_jsx(Icon, {
      color: value ? 'normal' : 'transparent',
      icon: "check"
    }), label && /*#__PURE__*/_jsx("label", {
      children: label
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Checkbox).withConfig({
  displayName: "Checkbox",
  componentId: "sc-1dd5x3p-0"
})(["display:inline-block;cursor:pointer;&.isDisabled{opacity:0.5;}&:not(.isDisabled){cursor:pointer;}> label{color:var(--color-text);display:inline-block;margin:0 0.5rem;opacity:1;cursor:pointer;user-select:none;}> label,> .ui--Icon{vertical-align:middle;}.ui--Icon{border:1px solid var(--color-checkbox);border-radius:0.125rem;}"]));