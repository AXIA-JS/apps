// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { jsx as _jsx } from "react/jsx-runtime";

function Description({
  className = '',
  dataTestId = '',
  description
}) {
  return /*#__PURE__*/_jsx("div", {
    className: className,
    "data-testid": dataTestId,
    children: description
  });
}

export default /*#__PURE__*/React.memo(styled(Description).withConfig({
  displayName: "Description",
  componentId: "sc-1t6dkba-0"
})(["margin-top:0.28rem;font-size:0.7rem;line-height:0.85rem;color:var(--color-label);"]));