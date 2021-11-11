// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Toggle({
  className = '',
  isDisabled,
  isOverlay,
  isRadio,
  label,
  onChange,
  preventDefault,
  value
}) {
  const _onClick = useCallback(event => {
    if (!isDisabled) {
      if (preventDefault) {
        event.preventDefault();
        event.stopPropagation();
      }

      onChange && onChange(!value);
    }
  }, [isDisabled, onChange, preventDefault, value]);

  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Toggle${value ? ' isChecked' : ''}${isDisabled ? ' isDisabled' : ''}${isOverlay ? ' isOverlay' : ''}${isRadio ? ' isRadio' : ''} ${className}`,
    onClick: _onClick,
    children: [label && /*#__PURE__*/_jsx("label", {
      children: label
    }), /*#__PURE__*/_jsx("div", {
      className: `ui--Toggle-Slider${isRadio ? ' highlight--before-border' : ''}`
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Toggle).withConfig({
  displayName: "Toggle",
  componentId: "sc-1338gt8-0"
})(["> label{display:inline-block;margin:0 0.5rem;}> label,> div{vertical-align:middle;}.ui--Toggle-Slider{background:var(--bg-toggle);border-radius:1.5rem;display:inline-block;height:1.5rem;position:relative;width:3rem;&::before{background:var(--bg-table);border:0.125rem solid var(--bg-toggle);border-radius:50%;content:\"\";height:1.5rem;left:0;position:absolute;top:0;width:1.5rem;}}&:not(.isDisabled){cursor:pointer;> label{cursor:pointer;}}&.isChecked{&:not(.isRadio){.ui--Toggle-Slider:before{transform:translateX(1.5rem);}}&.isRadio{.ui--Toggle-Slider:before{border-width:0.5rem;}}}&.isRadio{.ui--Toggle-Slider{width:1.5rem;}}&.isOverlay{bottom:1.375rem;position:absolute;right:3.5rem;}"]));