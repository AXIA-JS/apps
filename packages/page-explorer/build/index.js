// Copyright 2017-2021 @axia-js/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo, useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import { BlockAuthorsContext, EventsContext } from '@axia-js/react-query';
import BlockInfo from "./BlockInfo/index.js";
import Forks from "./Forks.js";
import Main from "./Main.js";
import NodeInfo from "./NodeInfo/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ExplorerApp({
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
    lastHeaders
  } = useContext(BlockAuthorsContext);
  const {
    eventCount,
    events
  } = useContext(EventsContext);
  const itemsRef = useRef([{
    isRoot: true,
    name: 'chain',
    text: t('Chain info')
  }, {
    hasParams: true,
    name: 'query',
    text: t('Block details')
  }, {
    name: 'forks',
    text: t('Forks')
  }, {
    name: 'node',
    text: t('Node info')
  }]);
  const hidden = useMemo(() => api.query.babe ? [] : ['forks'], [api]);
  return /*#__PURE__*/_jsxs("main", {
    className: className,
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/forks`,
        children: /*#__PURE__*/_jsx(Forks, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/query/:value`,
        children: /*#__PURE__*/_jsx(BlockInfo, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/query`,
        children: /*#__PURE__*/_jsx(BlockInfo, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/node`,
        children: /*#__PURE__*/_jsx(NodeInfo, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Main, {
          eventCount: eventCount,
          events: events,
          headers: lastHeaders
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(ExplorerApp);