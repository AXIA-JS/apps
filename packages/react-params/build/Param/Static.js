// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Static } from '@axia-js/react-components';
import { useTranslation } from "../translate.js";
import Bare from "./Bare.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function StaticParam({
  asHex,
  children,
  childrenPre,
  className = '',
  defaultValue,
  label
}) {
  const {
    t
  } = useTranslation();
  const value = defaultValue && defaultValue.value && (asHex ? defaultValue.value.toHex() : JSON.stringify(defaultValue.value.toHuman ? defaultValue.value.toHuman() : defaultValue.value, null, 2).replace(/"/g, '').replace(/\\/g, '').replace(/\],\[/g, '],\n['));
  return /*#__PURE__*/_jsxs(Bare, {
    className: className,
    children: [childrenPre, /*#__PURE__*/_jsx(Static, {
      className: "full",
      label: label,
      value: /*#__PURE__*/_jsx("pre", {
        children: value || t('<empty>')
      })
    }), children]
  });
}

export default /*#__PURE__*/React.memo(styled(StaticParam).withConfig({
  displayName: "Static",
  componentId: "sc-1cj81ks-0"
})(["pre{margin:0;overflow:hidden;text-overflow:ellipsis;}.ui--Static{margin-bottom:0 !important;}"]));