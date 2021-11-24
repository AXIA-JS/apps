// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { useTranslation } from '@axia-js/app-contracts/translate';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import introMd from "./md/intro.md";
import Contracts from "./Contracts/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ContractsApp({
  basePath,
  className = ''
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'contracts',
    text: t('Contracts')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: `contracts--App ${className}`,
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: introMd
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsx(Contracts, {})]
  });
}

export default /*#__PURE__*/React.memo(ContractsApp);