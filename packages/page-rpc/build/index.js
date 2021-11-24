// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import Rpc from "./Rpc/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RpcApp({
  basePath
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'rpc',
    text: t('Submission')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: "toolbox--App",
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsx(Switch, {
      children: /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Rpc, {})
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(RpcApp);