// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";

function ToggleIndex({
  index,
  isDisabled,
  isSelected,
  onChange,
  text
}) {
  const _onClick = useCallback(() => {
    !isDisabled && onChange(index);
  }, [isDisabled, index, onChange]);

  return /*#__PURE__*/_jsx(Button, {
    icon: isSelected ? 'check' : 'circle',
    isBasic: true,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: text,
    onClick: _onClick
  }, text);
}

const ToggleIndexMemo = /*#__PURE__*/React.memo(ToggleIndex);

function ToggleGroup({
  className = '',
  onChange,
  options,
  value
}) {
  if (!options.length || !options[0].value) {
    return null;
  }

  return /*#__PURE__*/_jsx("div", {
    className: `ui--ToggleGroup ${className}`,
    children: options.map(({
      isDisabled,
      text
    }, index) => /*#__PURE__*/_jsx(ToggleIndexMemo, {
      index: index,
      isDisabled: isDisabled,
      isSelected: value === index,
      onChange: onChange,
      text: text
    }, index))
  });
}

export default /*#__PURE__*/React.memo(styled(ToggleGroup).withConfig({
  displayName: "ToggleGroup",
  componentId: "sc-qebvc8-0"
})(["display:inline-block;margin-right:1.5rem;.ui--Button{margin:0;&:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;}&:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0;}.ui--Icon{width:1em;}}"]));