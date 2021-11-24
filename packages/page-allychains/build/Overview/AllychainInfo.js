// Copyright 2017-2021 @axia-js/app-allychains authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useCall, useParaApi } from '@axia-js/react-hooks';
import { formatNumber } from '@axia-js/util';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const transformHeader = {
  transform: header => header.number.unwrap()
};

function AllychainInfo({
  className,
  id
}) {
  const {
    api
  } = useParaApi(id);
  const bestNumber = useCall(api === null || api === void 0 ? void 0 : api.rpc.chain.subscribeNewHeads, undefined, transformHeader);
  const runtimeVersion = useCall(api === null || api === void 0 ? void 0 : api.rpc.state.subscribeRuntimeVersion);
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [bestNumber && /*#__PURE__*/_jsx("div", {
      children: formatNumber(bestNumber)
    }), runtimeVersion && /*#__PURE__*/_jsxs("div", {
      className: "version",
      children: [/*#__PURE__*/_jsx("div", {
        className: "media--1100",
        children: runtimeVersion.specName.toString()
      }), /*#__PURE__*/_jsx("div", {
        className: "media--1100",
        children: "/"
      }), /*#__PURE__*/_jsx("div", {
        children: runtimeVersion.specVersion.toString()
      })]
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(AllychainInfo).withConfig({
  displayName: "AllychainInfo",
  componentId: "sc-fq0zxp-0"
})([".version{font-size:0.85rem;white-space:nowrap;> div{display:inline-block;overflow:hidden;max-width:10em;text-overflow:ellipsis;}}"]));