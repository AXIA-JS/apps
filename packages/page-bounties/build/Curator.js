// Copyright 2017-2021 @axia-js/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AddressSmall } from '@axia-js/react-components';
import Description from "./Description.js";
import { useTranslation } from "./translate.js";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function Curator({
  curator,
  isFromProposal
}) {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx(AddressSmall, {
      value: curator.toString()
    }), isFromProposal && /*#__PURE__*/_jsx(Description, {
      description: t('Proposed Curator')
    })]
  });
}

export default /*#__PURE__*/React.memo(Curator);