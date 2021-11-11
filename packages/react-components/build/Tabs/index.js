import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CurrentSection from "./CurrentSection.js";
import Tab from "./Tab.js";
import Delimiter from "./TabsSectionDelimiter.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const TabsContext = /*#__PURE__*/React.createContext({});

// redirect on invalid tabs
function redirect(basePath, location, items, hidden) {
  if (location.pathname !== basePath) {
    // Has the form /staking/query/<something>
    const [,, section] = location.pathname.split('/');
    const alias = items.find(({
      alias
    }) => alias === section);

    if (alias) {
      window.location.hash = alias.isRoot ? basePath : `${basePath}/${alias.name}`;
    } else if (hidden && (hidden.includes(section) || !items.some(({
      isRoot,
      name
    }) => !isRoot && name === section))) {
      window.location.hash = basePath;
    }
  }
}

function Tabs({
  basePath,
  className = '',
  hidden,
  items
}) {
  const location = useLocation();
  const {
    icon,
    text
  } = React.useContext(TabsContext);
  useEffect(() => redirect(basePath, location, items, hidden), [basePath, hidden, items, location]);
  const filtered = hidden ? items.filter(({
    name
  }) => !hidden.includes(name)) : items;
  return /*#__PURE__*/_jsx("header", {
    className: `ui--Tabs ${className}`,
    children: /*#__PURE__*/_jsxs("div", {
      className: "tabs-container",
      children: [text && icon && /*#__PURE__*/_jsx(CurrentSection, {
        icon: icon,
        text: text
      }), /*#__PURE__*/_jsx(Delimiter, {}), /*#__PURE__*/_jsx("ul", {
        className: "ui--TabsList",
        children: filtered.map((tab, index) => /*#__PURE__*/_jsx("li", {
          children: /*#__PURE__*/_createElement(Tab, _objectSpread(_objectSpread({}, tab), {}, {
            basePath: basePath,
            index: index,
            key: tab.name
          }))
        }, index))
      })]
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Tabs).withConfig({
  displayName: "Tabs",
  componentId: "sc-1ubxreb-0"
})(["background:var(--bg-tabs);border-bottom:1px solid var(--border-tabs);text-align:left;z-index:1;& .tabs-container{display:flex;align-items:center;width:100%;margin:0 auto;max-width:var(--width-full);padding:0 1.5rem 0 0;height:3.286rem;}&::-webkit-scrollbar{display:none;width:0px;}.ui--TabsList{display:flex;list-style:none;height:100%;margin:0 1.4rem;white-space:nowrap;padding:0;@media only screen and (max-width:900px){margin:0 2.72rem 0 2.35rem;}}"]));