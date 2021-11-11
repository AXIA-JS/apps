// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
let id = 0;

function LabelHelp({
  className = '',
  help,
  icon = 'question-circle'
}) {
  const [trigger] = useState(() => `label-help-${++id}`);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--LabelHelp ${className}`,
    tabIndex: -1,
    children: [/*#__PURE__*/_jsx(Icon, {
      icon: icon,
      tooltip: trigger
    }), /*#__PURE__*/_jsx(Tooltip, {
      text: help,
      trigger: trigger
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(LabelHelp).withConfig({
  displayName: "LabelHelp",
  componentId: "sc-tdvzde-0"
})(["cursor:help;display:inline-block;line-height:1rem;margin:0 0 0 0.25rem;"]));