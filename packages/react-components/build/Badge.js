import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from "./Icon.js";
import Tooltip from "./Tooltip.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
let badgeId = 0;

function Badge({
  className = '',
  color = 'normal',
  hover,
  icon,
  info,
  isSmall,
  onClick
}) {
  const [trigger] = useState(() => `badge-hover-${Date.now()}-${badgeId++}`);
  const extraProps = hover ? {
    'data-for': trigger,
    'data-tip': true
  } : {};
  const isHighlight = color === 'highlight';
  return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, extraProps), {}, {
    className: `ui--Badge${hover ? ' isTooltip' : ''}${isSmall ? ' isSmall' : ''}${onClick ? ' isClickable' : ''}${isHighlight ? ' highlight--bg' : ''} ${color}Color ${className}`,
    onClick: onClick,
    children: [/*#__PURE__*/_jsx("div", {
      className: isHighlight ? 'highlight--color-contrast' : '',
      children: info || icon && /*#__PURE__*/_jsx(Icon, {
        icon: icon
      })
    }), hover && /*#__PURE__*/_jsx(Tooltip, {
      text: hover,
      trigger: trigger
    })]
  }));
}

export default /*#__PURE__*/React.memo(styled(Badge).withConfig({
  displayName: "Badge",
  componentId: "sc-6utzhi-0"
})(["border-radius:16px;box-sizing:border-box;color:#eeedec;display:inline-block;font-size:12px;height:22px;line-height:22px;margin-right:0.25rem;min-width:22px;padding:0 4px;overflow:hidden;text-align:center;vertical-align:middle;width:22px;&.isTooltip{cursor:help;}.ui--Icon{cursor:inherit;margin-top:5px;vertical-align:top;width:1em;}&.isClickable{cursor:pointer;}&.isSmall{font-size:10px;height:16px;line-height:16px;min-width:16px;padding:0;width:16px;.ui--Icon{margin-top:3px;}}&.blueColor{background:steelblue;}&.counterColor{margin:0 0.5rem;vertical-align:middle;}&.grayColor{background:#eeedec !important;color:#aaa9a8;}&.redColor{background:darkred;}&.greenColor{background:green;}&.orangeColor{background:darkorange;}&.purpleColor{background:indigo;}&.transparentColor{background:transparent;box-shadow:none;}&.whiteColor{background:rgba(255,255,255,0.3);}"]));