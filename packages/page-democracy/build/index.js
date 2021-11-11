// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import useDispatchCounter from "./Execute/useCounter.js";
import basicMd from "./md/basic.md";
import Execute from "./Execute/index.js";
import Overview from "./Overview/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { default as useCounter } from "./useCounter.js";

function DemocracyApp({
  basePath
}) {
  const {
    t
  } = useTranslation();
  const dispatchCount = useDispatchCounter();
  const items = useMemo(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: dispatchCount,
    name: 'dispatch',
    text: t('Dispatch')
  }], [dispatchCount, t]);
  return /*#__PURE__*/_jsxs("main", {
    className: "democracy--App",
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: basicMd
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/dispatch`,
        children: /*#__PURE__*/_jsx(Execute, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Overview, {})
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(DemocracyApp);