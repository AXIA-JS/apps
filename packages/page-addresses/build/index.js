// Copyright 2017-2021 @axia-js/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import Contacts from "./Contacts/index.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function AddressesApp({
  basePath,
  onStatusChange
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'contacts',
    text: t('My contacts')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsx(Switch, {
      children: /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Contacts, {
          basePath: basePath,
          onStatusChange: onStatusChange
        })
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(AddressesApp);