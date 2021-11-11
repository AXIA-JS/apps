// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Input } from '@axia-js/react-components/index';
import { jsx as _jsx } from "react/jsx-runtime";

function Filter({
  className = '',
  filterOn,
  label,
  setFilter
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    children: /*#__PURE__*/_jsx(Input, {
      autoFocus: true,
      isFull: true,
      label: label,
      onChange: setFilter,
      value: filterOn
    })
  });
}

export default /*#__PURE__*/React.memo(styled(Filter).withConfig({
  displayName: "FilterInput",
  componentId: "sc-1nki75u-0"
})(["width:29.5rem;:not(:only-child){margin-left:1.5rem;}.ui--Input{margin:0;height:3.893rem;}"]));