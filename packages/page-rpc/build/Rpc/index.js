// Copyright 2017-2021 @axia-js/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { StatusContext } from '@axia-js/react-components';
import Results from "./Results.js";
import Selection from "./Selection.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function RpcApp() {
  const {
    queueRpc,
    txqueue
  } = useContext(StatusContext);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Selection, {
      queueRpc: queueRpc
    }), /*#__PURE__*/_jsx(Results, {
      queue: txqueue
    })]
  });
}

export default /*#__PURE__*/React.memo(RpcApp);