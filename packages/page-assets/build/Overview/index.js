// Copyright 2017-2021 @axia-js/app-assets authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button } from '@axia-js/react-components';
import Assets from "./Assets.js";
import Create from "./Create/index.js";
import Summary from "./Summary.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Overview({
  className,
  ids,
  infos,
  openId
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(Summary, {
      numAssets: ids === null || ids === void 0 ? void 0 : ids.length
    }), /*#__PURE__*/_jsx(Button.Group, {
      children: /*#__PURE__*/_jsx(Create, {
        assetIds: ids,
        openId: openId
      })
    }), /*#__PURE__*/_jsx(Assets, {
      infos: infos
    })]
  });
}

export default /*#__PURE__*/React.memo(Overview);