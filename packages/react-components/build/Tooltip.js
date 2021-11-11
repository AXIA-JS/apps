// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function rootElement() {
  return typeof document === 'undefined' ? null // This hack is required for server side rendering
  : document.getElementById('tooltips');
}

function Tooltip({
  className = '',
  effect = 'solid',
  offset,
  place = 'top',
  text,
  trigger
}) {
  const [tooltipContainer] = useState(typeof document === 'undefined' ? {} // This hack is required for server side rendering
  : document.createElement('div'));
  useEffect(() => {
    const root = rootElement();
    root && root.appendChild(tooltipContainer);
    return () => {
      root && root.removeChild(tooltipContainer);
    };
  }, [tooltipContainer]);
  return /*#__PURE__*/ReactDOM.createPortal( /*#__PURE__*/_jsx(ReactTooltip, {
    className: `ui--Tooltip ${className}`,
    effect: effect,
    id: trigger,
    offset: offset,
    place: place,
    children: className !== null && className !== void 0 && className.includes('address') ? /*#__PURE__*/_jsx("div", {
      children: text
    }) : text
  }), tooltipContainer);
}

export default /*#__PURE__*/React.memo(styled(Tooltip).withConfig({
  displayName: "Tooltip",
  componentId: "sc-dqyx3h-0"
})(["> div{overflow:hidden;}&.ui--Tooltip{z-index:1002;}&.address div{overflow:hidden;text-overflow:ellipsis;}table{border:0;overflow:hidden;width:100%;td{text-align:left;}td:first-child{opacity:0.75;padding-right:0.25rem;text-align:right;white-space:nowrap;}}div+table,table+div{margin-top:0.75rem;}> div+div{margin-top:0.5rem;}.faded{margin-top:0;opacity:0.75 !important;font-size:0.85em !important;.faded{font-size:1em !important;}}.faded+.faded{margin-top:0;}.row+.row{margin-top:0.5rem;}"]));