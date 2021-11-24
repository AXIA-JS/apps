// Copyright 2017-2021 @axia-js/app-extrinsics authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';
import { Tabs } from '@axia-js/react-components';
import Decoder from "./Decoder.js";
import Submission from "./Submission.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function ExtrinsicsApp({
  basePath
}) {
  const {
    t
  } = useTranslation();
  const itemsRef = useRef([{
    isRoot: true,
    name: 'create',
    text: t('Submission')
  }, {
    name: 'decode',
    text: t('Decode')
  }]);
  return /*#__PURE__*/_jsxs("main", {
    className: "extrinsics--App",
    children: [/*#__PURE__*/_jsx(Tabs, {
      basePath: basePath,
      items: itemsRef.current
    }), /*#__PURE__*/_jsxs(Switch, {
      children: [/*#__PURE__*/_jsx(Route, {
        path: `${basePath}/decode`,
        children: /*#__PURE__*/_jsx(Decoder, {})
      }), /*#__PURE__*/_jsx(Route, {
        children: /*#__PURE__*/_jsx(Submission, {})
      })]
    })]
  });
}

export { ExtrinsicsApp };
export default /*#__PURE__*/React.memo(ExtrinsicsApp);