// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Input } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function StringInput({
  className = '',
  onChange,
  original,
  tkey,
  tval
}) {
  const _onChange = useCallback(value => onChange(tkey, value), [onChange, tkey]);

  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx("div", {
      className: "label",
      children: original
    }), /*#__PURE__*/_jsx(Input, {
      onChange: _onChange,
      value: tval,
      withLabel: false
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(StringInput).withConfig({
  displayName: "StringInput",
  componentId: "sc-1o5wi9b-0"
})([".label{font-style:italic;margin-top:0.5rem;+div{margin-left:1rem;}}"]));