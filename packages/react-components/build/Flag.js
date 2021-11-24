// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Tag } from '@axia-js/react-components/index';
import { jsx as _jsx } from "react/jsx-runtime";

function Flag({
  className = '',
  color,
  label
}) {
  return /*#__PURE__*/_jsx(Tag, {
    className: `${className} ${color === 'theme' ? ' highlight--color-bg highlight--bg' : ''}`,
    color: color,
    isFlag: true,
    label: label,
    size: "tiny"
  });
}

export default /*#__PURE__*/React.memo(styled(Flag).withConfig({
  displayName: "Flag",
  componentId: "sc-1ouhg0b-0"
})(["border-radius:0 0.25rem 0.25rem 0;padding:0.5833em 1.25em 0.5833em 1.5em;font-size:0.78571429rem;line-height:1;color:#fff !important;&.darkTheme{:after{background-color:var(--bg-tabs);}}&:after{background-color:#fff;border-radius:500rem;content:'';left:-0.25em;margin-top:-0.25em;position:absolute;width:0.5em;height:0.5em;top:50%;}&:before{border-radius:0.2rem 0 0.1rem 0;background-color:inherit;background-image:none;content:'';right:100%;width:1.5em;height:1.5em;position:absolute;transform:translateY(-50%) translateX(50%) rotate(-45deg);top:50%;transition:none;}"]));