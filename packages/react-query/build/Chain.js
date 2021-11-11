// Copyright 2017-2021 @axia-js/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import { useTranslation } from "./translate.js";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Chain({
  children,
  className = '',
  label
}) {
  const {
    t
  } = useTranslation();
  const {
    systemChain
  } = useApi();
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [label || '', systemChain || t('Unknown'), children]
  });
}

export default /*#__PURE__*/React.memo(Chain);