// Copyright 2017-2021 @axia-js/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Toggle } from '@axia-js/react-components';
import { Option } from '@axia-js/types';
import { useTranslation } from "../translate.js";
import Param from "./index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function OptionDisplay({
  className = '',
  defaultValue: _defaultValue,
  isDisabled,
  name,
  onChange,
  onEnter,
  onEscape,
  registry,
  type: {
    sub,
    withOptionActive
  }
}) {
  const {
    t
  } = useTranslation();
  const [isActive, setIsActive] = useState(withOptionActive || false);
  const defaultValue = useMemo(() => isDisabled ? _defaultValue && _defaultValue.value instanceof Option && _defaultValue.value.isSome ? {
    isValid: _defaultValue.isValid,
    value: _defaultValue.value.unwrap()
  } : {
    isValid: _defaultValue.isValid,
    value: undefined
  } : _defaultValue, [_defaultValue, isDisabled]);
  useEffect(() => {
    !isActive && onChange && onChange({
      isValid: true,
      value: null
    });
  }, [isActive, onChange]);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Param, {
      defaultValue: defaultValue,
      isDisabled: isDisabled || !isActive,
      isInOption: true,
      isOptional: !isActive && !isDisabled,
      name: name,
      onChange: onChange,
      onEnter: onEnter,
      onEscape: onEscape,
      registry: registry,
      type: sub
    }), !isDisabled && /*#__PURE__*/_jsx(Toggle, {
      isOverlay: true,
      label: t('include option'),
      onChange: setIsActive,
      value: isActive
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(OptionDisplay).withConfig({
  displayName: "Option",
  componentId: "sc-9urwzf-0"
})(["position:relative;"]));