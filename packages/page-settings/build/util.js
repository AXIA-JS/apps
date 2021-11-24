// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ChainImg, Dropdown, IdentityIcon } from '@axia-js/react-components';
import { settings } from '@axia-js/ui-settings';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function createOption({
  info,
  isHeader,
  text,
  value
}, overrides = [], override = 'empty', extra) {
  if (isHeader) {
    return /*#__PURE__*/_jsx(Dropdown.Header, {
      content: text
    }, text);
  }

  return {
    text: /*#__PURE__*/_jsxs("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/_jsx(ChainImg, {
        className: "ui--Dropdown-icon",
        logo: info && overrides.includes(info) ? override : info
      }), /*#__PURE__*/_jsxs("div", {
        className: "ui--Dropdown-name",
        children: [text, extra]
      })]
    }, value),
    value
  };
}
export function createIdenticon({
  info,
  text,
  value
}, overrides = [], override = 'empty') {
  const theme = info && overrides.includes(info) ? override : info;
  return {
    text: /*#__PURE__*/_jsxs("div", {
      className: "ui--Dropdown-item",
      children: [theme === 'empty' ? /*#__PURE__*/_jsx(ChainImg, {
        className: "ui--Dropdown-icon",
        logo: "empty"
      }) : /*#__PURE__*/_jsx(IdentityIcon, {
        className: "ui--Dropdown-icon",
        size: 32,
        theme: theme,
        value: "5F9999K9UgTUgSsbXZQcEmRMvQqwJoBUHMv9e1k2MdgghuRA"
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--Dropdown-name",
        children: text
      })]
    }, value),
    value
  };
}
export function save(state) {
  settings.set(state);
}
export function saveAndReload(state) {
  save(state); // HACK This is terrible, but since the API needs to re-connect and
  // the API does not yet handle re-connections properly, it is what it is

  window.location.reload();
}