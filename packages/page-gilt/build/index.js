// Copyright 2017-2021 @axia-js/app-gilt authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import Overview from "./Overview/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function GiltApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const tabsRef = useRef([{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: tabsRef.current
    }), /*#__PURE__*/_jsx(Switch, {
      children: /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Overview, {})
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(GiltApp);