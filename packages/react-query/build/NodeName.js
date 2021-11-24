// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import { jsxs as _jsxs } from "react/jsx-runtime";

function NodeName({
  children,
  className = '',
  label
}) {
  const {
    systemName
  } = useApi();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', systemName, children]
  });
}

export default /*#__PURE__*/React.memo(NodeName);