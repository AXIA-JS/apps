// Copyright 2017-2021 @axia-js/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import Labelled from "./Labelled.js";
import { jsx as _jsx } from "react/jsx-runtime";

function InfoForInput({
  children,
  className = '',
  type = 'info'
}) {
  return /*#__PURE__*/_jsx(Labelled, {
    children: /*#__PURE__*/_jsx("div", {
      className: `${className} ${type}`,
      children: children
    })
  });
}

export default /*#__PURE__*/React.memo(styled(InfoForInput).withConfig({
  displayName: "InfoForInput",
  componentId: "sc-fxkf2p-0"
})(["background:white;border-radius:0 0 0.25rem 0.25rem;margin:-0.5rem 0 0.25rem;padding:1.25rem 1.5rem 1rem;&.error{background:#db2828;color:#eee;}&.warning{background:#ffffe0;}> ul{margin:0;padding:0;}"]));