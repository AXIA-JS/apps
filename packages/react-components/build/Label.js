// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import LabelHelp from "./LabelHelp.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Label({
  className = '',
  help,
  label,
  withEllipsis
}) {
  return /*#__PURE__*/_jsxs("label", {
    className: className,
    children: [withEllipsis ? /*#__PURE__*/_jsx("div", {
      className: "withEllipsis",
      children: label
    }) : label, help && /*#__PURE__*/_jsx(LabelHelp, {
      help: help
    })]
  });
}

export default /*#__PURE__*/React.memo(Label);