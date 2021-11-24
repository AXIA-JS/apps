// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "../translate.js";
import { jsx as _jsx } from "react/jsx-runtime";

function VotingLink({
  className
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsx("a", {
    className: className,
    href: "#/council/motions",
    children: t('Voting')
  });
}

export default /*#__PURE__*/React.memo(styled(VotingLink).withConfig({
  displayName: "VotingLink",
  componentId: "sc-om5j1f-0"
})(["line-height:0.85rem;font-size:0.7rem;text-decoration:underline;"]));