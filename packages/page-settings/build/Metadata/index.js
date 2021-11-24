// Copyright 2017-2021 @axia-js/app-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useApi } from '@axia-js/react-hooks';
import useChainInfo from "../useChainInfo.js";
import Extensions from "./Extensions.js";
import NetworkSpecs from "./NetworkSpecs.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Metadata() {
  const {
    isDevelopment
  } = useApi();
  const chainInfo = useChainInfo();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [!isDevelopment && /*#__PURE__*/_jsx(_Fragment, {
      children: /*#__PURE__*/_jsx(Extensions, {
        chainInfo: chainInfo
      })
    }), /*#__PURE__*/_jsx(NetworkSpecs, {
      chainInfo: chainInfo
    })]
  });
}