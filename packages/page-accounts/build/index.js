// Copyright 2017-2021 @axia-js/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { HelpOverlay, Tabs } from '@axia-js/react-components';
import { useAccounts, useIpfs } from '@axia-js/react-hooks';
import basicMd from "./md/basic.md";
import Accounts from "./Accounts/index.js";
import { useTranslation } from "./translate.js";
import useCounter from "./useCounter.js";
import Vanity from "./Vanity/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export { useCounter };
const HIDDEN_ACC = ['vanity'];

function AccountsApp({
  basePath,
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const {
    hasAccounts
  } = useAccounts();
  const {
    isIpfs
  } = useIpfs();
  const tabsRef = useRef([{
    isRoot: true,
    name: 'overview',
    text: t('My accounts')
  }, {
    name: 'vanity',
    text: t('Vanity generator')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: "accounts--App",
    children: [/*#__PURE__*/_jsx(HelpOverlay, {
      md: basicMd
    }), /*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      hidden: hasAccounts && !isIpfs ? undefined : HIDDEN_ACC,
      items: tabsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/vanity`,
        children: /*#__PURE__*/_jsx(Vanity, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Accounts, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(AccountsApp);