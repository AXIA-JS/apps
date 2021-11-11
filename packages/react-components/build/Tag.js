import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Tooltip from "./Tooltip.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
let tagId = 0;

function Tag({
  className = '',
  color = 'theme',
  hover,
  label,
  size = 'small'
}) {
  const {
    theme
  } = useContext(ThemeContext);
  const [trigger] = useState(() => `tag-hover-${Date.now()}-${tagId++}`);
  const tooltipProps = hover ? {
    'data-for': trigger,
    'data-tip': true
  } : {};
  return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({
    className: `ui--Tag ${color}Color ${size}Size ${theme}Theme ${className}`,
    color: color || 'grey'
  }, tooltipProps), {}, {
    children: [label, hover && /*#__PURE__*/_jsx(Tooltip, {
      text: hover,
      trigger: trigger
    })]
  }));
}

export default /*#__PURE__*/React.memo(styled(Tag).withConfig({
  displayName: "Tag",
  componentId: "sc-14vk48u-0"
})(["border-radius:0.25rem;color:#fff;display:inline-block;font-size:0.857rem;font-weight:var(--font-weight-normal);line-height:1.143rem;margin:0 0.125rem;padding:0.571em 0.857em;position:relative;white-space:nowrap;z-index:1;&.tinySize{font-size:.71428571rem;}&.blueColor{background:#2185d0;}&.greenColor{background:#21ba45;}&.greyColor{background:#767676;}&.orangeColor{background:#f2711c;}&.pinkColor{background:#e03997;}&.redColor{background:#db2828;}&.yellowColor{background:darkgoldenrod;}&.themeColor.darkTheme{background-color:rgba(255,255,255,0.08);}"]));