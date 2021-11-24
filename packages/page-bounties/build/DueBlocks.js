// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { BlockToTime } from '@axia-js/react-query';
import { formatNumber } from '@axia-js/util';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function DueBlocks({
  dueBlocks,
  endBlock,
  label
}) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: dueBlocks.gtn(0) && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(BlockToTime, {
        value: dueBlocks,
        children: ["\xA0(", label, ")"]
      }), "#", formatNumber(endBlock)]
    })
  });
}

export default /*#__PURE__*/React.memo(DueBlocks);