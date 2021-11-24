// Copyright 2017-2021 @axia-js/app-society authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useMemo } from 'react';
import { AddressSmall } from '@axia-js/react-components';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function BidType({
  value
}) {
  const vouchId = useMemo(() => value !== null && value !== void 0 && value.isVouch ? value.asVouch[0] : null, [value]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("td", {
      className: "no-pad-right",
      children: value && value.type
    }), /*#__PURE__*/_jsx("td", {
      children: vouchId && /*#__PURE__*/_jsx(AddressSmall, {
        value: vouchId
      })
    })]
  });
}

export default /*#__PURE__*/React.memo(BidType);