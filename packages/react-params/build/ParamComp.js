// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import Param from "./Param/index.js";
import { jsx as _jsx } from "react/jsx-runtime";

function ParamComp({
  defaultValue,
  index,
  isDisabled,
  name,
  onChange,
  onEnter,
  onEscape,
  overrides,
  registry,
  type
}) {
  const _onChange = useCallback(value => onChange(index, value), [index, onChange]);

  return /*#__PURE__*/_jsx("div", {
    className: "ui--Param-composite",
    children: /*#__PURE__*/_jsx(Param, {
      defaultValue: defaultValue,
      isDisabled: isDisabled,
      name: name,
      onChange: _onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      overrides: overrides,
      registry: registry,
      type: type
    }, `input:${index}`)
  });
}

export default /*#__PURE__*/React.memo(ParamComp);