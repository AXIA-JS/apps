// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { bnToBn } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const TICK_TIMEOUT = 100;
const tickers = new Map();
let lastNow = Date.now();
let lastId = 0;

function tick() {
  lastNow = Date.now();

  for (const ticker of tickers.values()) {
    ticker(lastNow);
  }

  setTimeout(tick, TICK_TIMEOUT);
}

function formatValue(value, type = 's', withDecimal = false) {
  const [pre, post] = value.toFixed(1).split('.');
  const before = pre.split('').map((d, index) => /*#__PURE__*/_jsx("div", {
    className: "digit",
    children: d
  }, index));
  return withDecimal ? /*#__PURE__*/_jsxs(_Fragment, {
    children: [before, ".", /*#__PURE__*/_jsx("div", {
      className: "digit",
      children: post
    }), " ", type]
  }) : /*#__PURE__*/_jsxs(_Fragment, {
    children: [before, " ", type]
  });
}

function getDisplayValue(now = 0, value = 0) {
  const tsValue = (value && value.getTime ? value.getTime() : bnToBn(value).toNumber()) || 0;

  if (!now || !tsValue) {
    return formatValue(0, 's', true);
  }

  const elapsed = Math.max(Math.abs(now - tsValue), 0) / 1000;
  return elapsed < 60 ? formatValue(elapsed, 's', elapsed < 15) : elapsed < 3600 ? formatValue(elapsed / 60, 'min') : formatValue(elapsed / 3600, 'hr');
}

tick();

function Elapsed({
  children,
  className = '',
  value
}) {
  const [now, setNow] = useState(lastNow);
  useEffect(() => {
    const id = lastId++;
    tickers.set(id, setNow);
    return () => {
      tickers.delete(id);
    };
  }, []);
  return /*#__PURE__*/_jsxs("div", {
    className: `ui--Elapsed ${className}`,
    children: [getDisplayValue(now, value), children]
  });
}

export default /*#__PURE__*/React.memo(styled(Elapsed).withConfig({
  displayName: "Elapsed",
  componentId: "sc-53dy7o-0"
})([".digit{display:inline-block;width:1ch;}"]));