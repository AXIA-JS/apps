// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function itemOption(label, value, img) {
  return {
    text: /*#__PURE__*/_jsxs("div", {
      className: "ui--Dropdown-item",
      children: [/*#__PURE__*/_jsx("img", {
        alt: label,
        className: "ui--Dropdown-icon",
        src: img
      }), /*#__PURE__*/_jsx("div", {
        className: "ui--Dropdown-name",
        children: label
      })]
    }, value),
    value
  };
}