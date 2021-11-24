// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import { jsxs as _jsxs } from "react/jsx-runtime";

function NodeVersion({
  children,
  className = '',
  label
}) {
  const {
    systemVersion
  } = useApi(); // eg. 0.1.0-90d0bb6-x86_64-macos

  const displayVersion = systemVersion.split('-')[0];
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', displayVersion, children]
  });
}

export default /*#__PURE__*/React.memo(NodeVersion);