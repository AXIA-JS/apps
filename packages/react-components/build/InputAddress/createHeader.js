// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Dropdown from "../Dropdown.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function createHeader(option) {
  return /*#__PURE__*/_jsx(Dropdown.Header, {
    content: option.name
  }, option.key || option.name);
}