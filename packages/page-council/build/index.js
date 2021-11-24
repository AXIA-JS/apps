// Copyright 2017-2021 @axia-js/app-democracy authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from '@axia-js/react-components';
import { useApi, useCall } from '@axia-js/react-hooks';
import Motions from "./Motions/index.js";
import Overview from "./Overview/index.js";
import { useTranslation } from "./translate.js";
import useCounter from "./useCounter.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { useCounter };

function CouncilApp({
  basePath,
  className
}) {
  const {
    t
  } = useTranslation();
  const {
    api
  } = useApi();
  const {
    pathname
  } = useLocation();
  const numMotions = useCounter();
  const prime = useCall(api.derive.council.prime);
  const motions = useCall(api.derive.council.proposals);
  const items = useMemo(() => [{
    isRoot: true,
    name: 'overview',
    text: t('Overview')
  }, {
    count: numMotions,
    name: 'motions',
    text: t('Motions')
  }], [numMotions, t]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: items
    }), /*#__PURE__*/_jsx(Switch, {
      children: /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/motions`,
        children: /*#__PURE__*/_jsx(Motions, {
          motions: motions,
          prime: prime
        })
      })
    }), /*#__PURE__*/_jsx(Overview, {
      className: [basePath, `${basePath}/candidates`].includes(pathname) ? '' : 'council--hidden',
      prime: prime
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(CouncilApp).withConfig({
  displayName: "src",
  componentId: "sc-gp94ja-0"
})([".council--hidden{display:none;}"]));