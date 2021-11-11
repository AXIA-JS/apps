// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { encodeTypeDef } from '@axia-js/types/create';
import { isUndefined } from '@axia-js/util';
import findComponent from "./findComponent.js";
import Static from "./Static.js";
import { jsx as _jsx } from "react/jsx-runtime";

function Param({
  className = '',
  defaultValue,
  isDisabled,
  isInOption,
  isOptional,
  name,
  onChange,
  onEnter,
  onEscape,
  overrides,
  registry,
  type
}) {
  const Component = useMemo(() => findComponent(registry, type, overrides), [registry, type, overrides]);
  const label = useMemo(() => isUndefined(name) ? `${isDisabled && isInOption ? 'Option<' : ''}${encodeTypeDef(registry, type)}${isDisabled && isInOption ? '>' : ''}` : `${name}: ${isDisabled && isInOption ? 'Option<' : ''}${encodeTypeDef(registry, type)}${isDisabled && isInOption ? '>' : ''}`, [isDisabled, isInOption, name, registry, type]);

  if (!Component) {
    return null;
  }

  return isOptional ? /*#__PURE__*/_jsx(Static, {
    defaultValue: defaultValue,
    label: label,
    type: type
  }) : /*#__PURE__*/_jsx(Component, {
    className: `ui--Param ${className}`,
    defaultValue: defaultValue,
    isDisabled: isDisabled,
    isInOption: isInOption,
    label: label,
    name: name,
    onChange: onChange,
    onEnter: onEnter,
    onEscape: onEscape,
    overrides: overrides,
    registry: registry,
    type: type
  }, `${name || 'unknown'}:${type.toString()}`);
}

export default /*#__PURE__*/React.memo(Param);