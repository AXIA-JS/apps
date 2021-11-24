// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Labelled } from '@axia-js/react-components';
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Base({
  children,
  className = '',
  isOuter,
  label,
  size = 'full',
  withLabel
}) {
  return /*#__PURE__*/_jsxs(Bare, {
    className: className,
    children: [/*#__PURE__*/_jsx(Labelled, {
      className: size,
      isOuter: true,
      label: label,
      withEllipsis: true,
      withLabel: withLabel,
      children: !isOuter && children
    }), isOuter && children]
  });
}

export default /*#__PURE__*/React.memo(Base);