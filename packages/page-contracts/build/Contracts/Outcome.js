// Copyright 2017-2021 @axia-js/app-contracts authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { Button, IdentityIcon, Output } from '@axia-js/react-components';
import valueToText from '@axia-js/react-params/valueToText';
import MessageSignature from "../shared/MessageSignature.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Outcome({
  className = '',
  onClear,
  outcome: {
    from,
    message,
    output,
    params,
    result,
    when
  }
}) {
  return /*#__PURE__*/_jsxs("div", {
    className: className,
    children: [/*#__PURE__*/_jsx(IdentityIcon, {
      value: from
    }), /*#__PURE__*/_jsx(Output, {
      className: "output",
      isError: !result.isOk,
      isFull: true,
      label: /*#__PURE__*/_jsx(MessageSignature, {
        message: message,
        params: params
      }),
      labelExtra: /*#__PURE__*/_jsxs("span", {
        className: "date-time",
        children: [when.toLocaleDateString(), ' ', when.toLocaleTimeString()]
      }),
      value: valueToText('Text', result.isOk ? output : result)
    }), /*#__PURE__*/_jsx(Button, {
      icon: "times",
      onClick: onClear
    })]
  });
}

export default /*#__PURE__*/React.memo(styled(Outcome).withConfig({
  displayName: "Outcome",
  componentId: "sc-1hnsqhp-0"
})(["align-items:center;display:flex;.output{flex:1 1;margin:0.25rem 0.5rem;}"]));