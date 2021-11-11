// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { isError, isNull, isUndefined } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const format = value => {
  if (isError(value)) {
    return value.stack ? value.stack : value.toString();
  } else if (isUndefined(value)) {
    return 'undefined';
  } else if (isNull(value)) {
    return 'null';
  } else if (Array.isArray(value)) {
    return `[${value.map(value => format(value)).join(', ')}]`;
  } else if (value instanceof Map) {
    return `{${[...value.entries()].map(([key, value]) => key + ': ' + format(value)).join(', ')}}`;
  }

  return value.toString();
};

const renderEntry = ({
  args,
  type
}, index) => /*#__PURE__*/_jsx("div", {
  className: `js--Log ${type}`,
  children: args.map(arg => format(arg)).join(' ')
}, index);

function Output({
  children,
  className = '',
  logs
}) {
  return /*#__PURE__*/_jsxs("article", {
    className: `container ${className}`,
    children: [/*#__PURE__*/_jsx("div", {
      className: "logs-wrapper",
      children: /*#__PURE__*/_jsx("div", {
        className: "logs-container",
        children: /*#__PURE__*/_jsx("pre", {
          className: "logs-content",
          children: logs.map(renderEntry)
        })
      })
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(Output).withConfig({
  displayName: "Output",
  componentId: "sc-1m1tx1p-0"
})(["background-color:#4e4e4e;color:#ffffff;display:flex;flex-direction:column;flex-grow:1;font:var(--font-mono);font-variant-ligatures:common-ligatures;line-height:18px;padding:50px 10px 10px;position:relative;width:40%;.logs-wrapper{display:flex;flex:1;min-height:0;}.logs-container{flex:1;overflow:auto;}.logs-content{height:auto;}.js--Log{animation:fadein 0.2s;margin:0 0 5px 0;word-break:break-all;&.error{color:#f88;}}"]));