// Copyright 2017-2021 @axia-js/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Icon, Tabs } from '@axia-js/react-components';
import { useSudo } from '@axia-js/react-hooks';
import SetKey from "./SetKey.js";
import Sudo from "./Sudo.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SudoApp({
  basePath
}) {
  const {
    t
  } = useTranslation();
  const {
    allAccounts,
    hasSudoKey,
    sudoKey
  } = useSudo();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'index',
    text: t('Sudo access')
  }, {
    name: 'key',
    text: t('Set sudo key')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), hasSudoKey ? /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/key`,
        children: /*#__PURE__*/_jsx(SetKey, {
          allAccounts: allAccounts,
          isMine: hasSudoKey,
          sudoKey: sudoKey
        })
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Sudo, {
          allAccounts: allAccounts,
          isMine: hasSudoKey,
          sudoKey: sudoKey
        })
      })]
    }) : /*#__PURE__*/_jsx("article", {
      className: "error padded",
      children: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Icon, {
          icon: "ban"
        }), t('You do not have access to the current sudo key')]
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(SudoApp);