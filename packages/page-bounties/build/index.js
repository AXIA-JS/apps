// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Tabs } from '@axia-js/react-components';
import Bounties from "./Bounties.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { default as useCounter } from "./useCounter.js";

function BountiesApp({
  basePath,
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'index',
    text: t('Overview')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: `bounties--App ${className}`,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsx(Bounties, {})]
  });
}

export default /*#__PURE__*/React.memo(BountiesApp);