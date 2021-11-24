// Copyright 2017-2021 @axia-js/app-signing authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import Hash from "./Hash.js";
import Sign from "./Sign.js";
import { useTranslation } from "./translate.js";
import Verify from "./Verify.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function SigningApp({
  basePath
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'sign',
    text: t('Sign message')
  }, {
    name: 'verify',
    text: t('Verify signature')
  }, {
    name: 'hash',
    text: t('Hash data')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: "toolbox--App",
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/hash`,
        children: /*#__PURE__*/_jsx(Hash, {})
      }), /*#__PURE__*/_jsx(Route, {
        path: `${basePath}/verify`,
        children: /*#__PURE__*/_jsx(Verify, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Sign, {})
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(SigningApp);