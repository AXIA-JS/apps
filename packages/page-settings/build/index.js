// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import { useApi } from '@axia-js/react-hooks';
import md from "./md/basics.md";
import Developer from "./Developer.js";
import General from "./General.js";
import I18n from "./I18n/index.js";
import Metadata from "./Metadata/index.js";
import { useTranslation } from "./translate.js";
import useCounter from "./useCounter.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { useCounter };

function SettingsApp({
  basePath,
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    isApiConnected,
    isApiReady
  } = useApi();
  const numExtensions = useCounter();
  const items = useMemo(() => [{
    isRoot: true,
    name: 'general',
    text: t('General')
  }, {
    count: numExtensions,
    name: 'metadata',
    text: t('Metadata')
  }, {
    name: 'developer',
    text: t('Developer')
  }, {
    name: 'i18n',
    text: t('Translate')
  }], [numExtensions, t]);
  const hidden = useMemo(() => isApiConnected && isApiReady ? [] : ['metadata', 'i18n'], [isApiConnected, isApiReady]);
  return /*#__PURE__*/_jsxs("main", {
    className: "settings--App",
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: md
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: hidden,
      items: items
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/developer`,
        children: /*#__PURE__*/_jsx(Developer, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/i18n`,
        children: /*#__PURE__*/_jsx(I18n, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/metadata`,
        children: /*#__PURE__*/_jsx(Metadata, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(General, {})
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(SettingsApp);